import { uniqueId } from 'lodash'
import { Settings } from '~/model/settings'
import { Floor } from '../floor'
import { Immutable } from '../pkg/immutable'
import { PromiseFactory } from '../pkg/native/promise'
import { ProcessorFactory } from '../processor/factory'
import { Resolvable } from '../resolvable'
import { ResolvableFactory } from '../resolvable/factory'
import { TimerFactory } from '../timer/factory'

/**
 * If, or to which direction, thre is movement.
 * @see {@link Elevator.moveState}
 */
enum MoveState {
  /**
   * Is not moving, and at a serviced Floor.
   * Idle != Not moving, but between floors
   */
  Idle,
  /**
   * Moving to higher floor/position
   */
  MovingDown,
  /**
   * Moving to lower floor/position
   */
  MovingUp,
}

/**
 * Identifies elevator door state.
 * @see {@link Elevator.doorCloseProcessor}
*/
enum DoorState {
  Closed,
  Closing,
  Open,
}

// TODO: class Doors {}

/**
 * Class controlling an Elevator unit.
 * Tip: Start with {@link Elevator.goTo}
 */
export class Elevator {
  /**
   * Time in milliseconds for doors to close
   */
  static readonly closeDuration = 1500
  /**
   * Elevator position in height unit, not floor.
   * A height unit is the unit used for ctx.floorHeight
   */
  private _position: number = 0
  /**
   * Processor managing door closing
   */
  private readonly _doorCloseProcessor = this._processorFactory.create<undefined>({
    before: () => {
      this.doorState = DoorState.Closing
      // Doors should stay open for a short period
      // so passangers can block its close if needed
      return this._timerFactory.create(3000)
    },
    after: () => (this.doorState = DoorState.Closed),
    process: () => this._timerFactory.create(Elevator.closeDuration),
    onPause: () => this._openDoors()
  })

  /**
   * Where elevator is currently moving to
   */
  private _moveToFloor: Floor | null = null
  /**
   * Manages elevator movement, including pause/resume
   */
  private readonly _moveProcess = this._processorFactory.create<{ interval: number }>({
    // A setInterval timer enables pausing the movement
    initialState: { interval: -1 },
    before: () => this._doorCloseProcessor.run(),
    always: (state) => clearInterval(state.interval),
    process: (state) => this._promiseFactory.create(resolve => {
      const move = (): void => {
        if (
          (this._moveToFloor == null) ||
          // Process ends when elevator arrives at floor
          this._position === this._moveToFloor.bottomPosition
        ) {
          return resolve(undefined)
        }
        switch (this._moveState) {
          case MoveState.MovingUp:
            this._position++
            return
          case MoveState.MovingDown:
            this._position--
            return
          default:
            resolve(undefined)
        }
      }
      // TODO: Add easing for arrival
      state.interval = window.setInterval(move, 1)
    })
  })

  /**
   * Stores floors where elevator will move to next.
   * First item, index 0, is the next floor in queue
   */
  private _queue = this._immutable.List<Floor>()
  /**
   * Manage processing queued floor requests
   */
  private readonly _queueProcess = this._processorFactory.create({
    process: async () => {
      const floor = this._queue.get(0)
      if (floor === undefined) return
      await this._moveProcess.end
      this._moveToFloor = floor
      // Only serviced floors will be in queue, and
      // moveProcess only ends on serviced floor arrival
      const currentFloor = this._currentFloor as Floor
      this._moveState = floor.number > currentFloor.number
        ? MoveState.MovingUp
        : MoveState.MovingDown
      return await this._moveProcess.run()
    },
    after: () => {
      this._queue = this._queue.shift()
      this._moveState = MoveState.Idle
      // Same as moveProcess, a queue process
      // only ends on serviced floor arrival
      if (this._queue.size > 0) void (this._queueProcess.run())
    }
  })

  /**
   * Elevator movement state.
   * Elevator is Idle only when not moving
   * and positioned at a serviced floor.
   */
  private _moveState = MoveState.Idle
  /**
   * Which floor the elevator is at.
   * Result depends on current MoveState.
   * The elevator can be positioned at a floor which
   * it does not service, this will then return undefined
  */
  private get _currentFloor (): Floor | undefined {
    return this._floors.find((floor) => {
      switch (this._moveState) {
        case MoveState.Idle:
          return this.position === floor.bottomPosition
        case MoveState.MovingDown:
          return this.position < floor.topPosition
        case MoveState.MovingUp:
          return this._topPosition > floor.bottomPosition
        default:
          return false
      }
    })
  }

  /**
   * Position of this elevator's ceiling
   */
  private get _topPosition (): number {
    return this.position + this._ctx.floorHeight
  }

  /**
   * If elevator is past the given floor.
   * Result depends on current MoveState.
   * Result is later used to decide if elevator can
   * stop at given floor, so this calculation is strict,
   * it returns false only if elevator has not entered the
   * floor's space (position, topPosition)
   */
  private _isPast (floor: Floor): boolean {
    switch (this._moveState) {
      case MoveState.MovingDown:
        return this.position < floor.topPosition
      case MoveState.MovingUp:
        return this._topPosition > floor.bottomPosition
      default:
        return this.isIdleAt(floor)
    }
  }

  private async _openDoors (): Promise<void> {
    // Only open doors when elevator is idle
    if (this._moveState === MoveState.Idle || this._moveProcess.isPaused) {
      this.doorState = DoorState.Open
      // Simulate doors opening duration
      // TODO: Refactor this to Doors class
      return await this._timerFactory.create(Elevator.closeDuration)
    }
  }

  /**
   * @param _floors Floors serviced by this elevator
   */
  constructor (
    private readonly _floors: Floor[],
    private readonly _ctx: Settings,
    private readonly _immutable: Immutable,
    private readonly _processorFactory: ProcessorFactory,
    private readonly _resolvableFactory: ResolvableFactory,
    private readonly _timerFactory: TimerFactory,
    private readonly _promiseFactory: PromiseFactory
  ) {}

  /**
   * @see {@link DoorState}
   */
  doorState = DoorState.Closed

  /**
   * Used by external code.
   * Example in UI rendering loops
   */
  readonly id = uniqueId()
  /**
   * Current elevator position
   * In height unit, not floors
   */
  get position (): number {
    return this._position
  }

  get queue (): Elevator['_queue'] {
    return this._queue
  }

  /**
   * Temporarily prevent closing of elevator doors
   */
  blockClose (): Promise<unknown> {
    return this._doorCloseProcessor.pause()
  }

  /**
   * Elevator's distance to a given floor =
   * Distance between stops until floor +
   * Distance from last stop to floor. Or
   * If floor is next, distance from elevator
   * @returns
   * False if floor is not serviced,
   * or distance in height units
   */
  distanceTo (floor: Floor): false | number {
    if (!this._floors.includes(floor)) return false
    // If queue is empty, floor can be next
    if (this._queue.size === 0) {
      // Return distance from elevator to floor
      return Math.abs(this._position - floor.bottomPosition)
    }
    // Find where floor would be in the current queue
    let positionIndex = 0
    if (this._isPast(floor)) {
      positionIndex = this._queue.findIndex(queuedFloor =>
        this._moveState === MoveState.MovingUp
          ? queuedFloor < floor
          : queuedFloor > floor
      )
    } else {
      const nextFloor = this._queue.get(0)
      if (nextFloor === undefined) return false
      const canGoToNext = this._moveState === MoveState.MovingUp
        ? nextFloor.number > floor.number
        : nextFloor.number < floor.number
      if (canGoToNext) {
        // Return distance from elevator to floor
        return Math.abs(this._position - floor.bottomPosition)
      } else {
        // Otherwise find floor's next queue index
        positionIndex = this._queue.findIndex(queuedFloor =>
          this._moveState === MoveState.MovingUp
            ? queuedFloor > floor
            : queuedFloor < floor
        )
      }
    }
    if (positionIndex === -1) {
      positionIndex = this._queue.size
    }
    const nextFloor = this._queue.get(0)
    if (nextFloor === undefined) return 0
    // Calculate distance between queued floors
    let distance = Math.abs(this.position - nextFloor.bottomPosition)
    for (let i = 0; i < positionIndex; i++) {
      const queuedFloor = this._queue.get(i)
      if (queuedFloor === undefined) break
      const nextQueuedFloor = this._queue.get(i + 1)
      if (nextQueuedFloor === undefined) break
      distance += nextQueuedFloor === undefined
        ? Math.abs(queuedFloor.bottomPosition - floor.bottomPosition)
        : Math.abs(queuedFloor.bottomPosition - nextQueuedFloor.bottomPosition)
    }
    return distance
  }

  goTo (floor: Floor): boolean {
    // If floor is awaiting elevator, return queue promise
    if (this._queue.includes(floor)) return true
    // Only go to serviced floors
    if (!this._floors.includes(floor)) return false
    // If queue is empty, no need to find insert position
    if (this._queue.size === 0) {
      this._queue = this._queue.push(floor)
    } else if (this._isPast(floor)) {
      // Otherwise, find optimal position to queue floor.
      // If elevator is past floor, find best position to
      // queue the floor based on elevators move direction
      const positionIndex = this._queue.findIndex(queuedFloor =>
        this._moveState === MoveState.MovingDown
          ? queuedFloor > floor
          : queuedFloor < floor
      )
      // Floor should be queued last
      if (positionIndex === -1) {
        this._queue = this._queue.push(floor)
      } else {
        // Floor should be placed before positionIndex
        this._queue = this._queue.splice(positionIndex, 0, floor)
      }
    } else {
      const nextFloor = this._queue.get(0)
      if (nextFloor === undefined) {
        this._queue = this._queue.push(floor)
        return true
      }
      // If elevator is not past floor
      // Check if floor can be next in queue
      const canGoToNext = this._moveState === MoveState.MovingDown
        ? nextFloor.number < floor.number
        : nextFloor.number > floor.number
      if (canGoToNext) {
        // Jump the queue
        this._moveToFloor = floor
        this._queue = this._queue.unshift(floor)
      } else {
        // Otherwise find floor's next queue index
        const positionIndex = this._queue.findIndex(queuedFloor =>
          this._moveState === MoveState.MovingDown
            ? queuedFloor < floor
            : queuedFloor > floor
        )
        // Floor should be queued last
        if (positionIndex === -1) {
          this._queue = this._queue.push(floor)
        } else {
          // Floor should be placed before positionIndex
          this._queue = this._queue.splice(positionIndex, 0, floor)
        }
      }
    }
    // Assure queue process is running
    void (this._queueProcess.run())
    return true
  }

  /**
   * Given floor should be one serviced by this elevator
   */
  isIdleAt (floor: Floor): boolean {
    const currentFloor = this._currentFloor?.number ?? -1
    return currentFloor > -1 && currentFloor === floor.number
  }

  /**
   * Release closing of elevator doors.
   * Normally called after this.blockClose
   */
  releaseClose (): Resolvable {
    return this._doorCloseProcessor.reset()
  }

  /**
   * Open elevator doors, or block doors from closing
   */
  async open (): Promise<void> {
    if (this._doorCloseProcessor.isRunning) {
      await this.blockClose()
    } else {
      await this._openDoors()
    }
    return await this.releaseClose()
  }

  /**
   * Stop, or resume, elevator movement
   */
  toggleStop (): void {
    // Currently, elevator movement can only
    // be pause by the toggleStop method
    if (this._moveProcess.isPaused) void (this._moveProcess.run())
    else void (this._moveProcess.pause())
  }
}
