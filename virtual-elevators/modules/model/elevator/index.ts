import { uniqueId } from 'lodash'
import { Settings } from '~/model/settings'
import { Floor } from '../floor'
import { Processor } from '../processor'
import { Resolvable } from '../resolvable'
import { timer } from '../timer/timer'

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
  static readonly CLOSE_DURATION = 1500
  /**
   * Elevator position in height unit, not floor.
   * A height unit is the unit used for ctx.floorHeight
   */
  private _position: number = 0
  /**
   * Map<Floor.id, Resolvable>
   * Stores promises for external code to await
   * on elevator arrival at floor.
   * @see Elevator.onArrival
   * @see Elevator.arrivedAt
   */
  private readonly _arrivalMap = new Map<string, Resolvable>()
  /**
   * Processor managing door closing
   */
  private readonly _doorCloseProcessor = new Processor<undefined>({
    before: () => {
      this.doorState = DoorState.Closing
      // Doors should stay open for a short period
      // so passangers can block its close if needed
      return timer(3000)
    },
    after: () => (this.doorState = DoorState.Closed),
    process: () => timer(Elevator.CLOSE_DURATION),
    onPause: () => this.openDoors()
  })

  /**
   * Where elevator is currently moving to
   */
  private moveToFloor: Floor | null = null
  /**
   * Manages elevator movement, including pause/resume
   */
  private readonly moveProcess = new Processor<{ interval: number }>({
    // A setInterval timer enables pausing the movement
    initialState: { interval: -1 },
    before: async () => await this._doorCloseProcessor.run(),
    always: (state) => clearInterval(state.interval),
    process: async (state) => await new Promise<void>(resolve => {
      const move = (): void => {
        if (
          (this.moveToFloor == null) ||
          // Process ends when elevator arrives at floor
          this._position === this.moveToFloor.bottomPosition
        ) {
          return resolve()
        }
        switch (this.moveState) {
          case MoveState.MovingUp:
            this._position++
            return
          case MoveState.MovingDown:
            this._position--
            return
          default:
            resolve()
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
  private readonly queue: Floor[] = []
  /**
   * Manage processing queued floor requests
   */
  private readonly queueProcess = new Processor({
    process: async () => {
      const floor = this.queue[0]
      await this.moveProcess.end
      this.moveToFloor = floor
      // Only serviced floors will be in queue, and
      // moveProcess only ends on serviced floor arrival
      const currentFloor = this.currentFloor as Floor
      this.moveState = floor.number > currentFloor.number
        ? MoveState.MovingUp
        : MoveState.MovingDown
      return await this.moveProcess.run()
    },
    after: () => {
      this.queue.shift()
      this.moveState = MoveState.Idle
      // Same as moveProcess, a queue process
      // only ends on serviced floor arrival
      this.arrivedAt(this.currentFloor as Floor)
      if (this.queue.length > 0) void (this.queueProcess.run())
    }
  })

  /**
   * Elevator movement state.
   * Elevator is Idle only when not moving
   * and positioned at a serviced floor.
   */
  private moveState = MoveState.Idle
  /**
   * Which floor the elevator is at.
   * Result depends on current MoveState.
   * The elevator can be positioned at a floor which
   * it does not service, this will then return undefined
  */
  private get currentFloor (): Floor | undefined {
    return this.floors.find((floor) => {
      switch (this.moveState) {
        case MoveState.Idle:
          return this.position === floor.bottomPosition
        case MoveState.MovingDown:
          return this.position < floor.topPosition
        case MoveState.MovingUp:
          return this.topPosition > floor.bottomPosition
        default:
          return false
      }
    })
  }

  /**
   * Position of this elevator's ceiling
   */
  private get topPosition (): number {
    return this.position + this.ctx.floorHeight
  }

  /**
   * After elevator has arrived at given floor.
   * Resolve the floor's arrivalMap promise
   */
  private arrivedAt (floor: Floor): void {
    if (this._arrivalMap.get(floor.id)?.resolve() === true) {
      this._arrivalMap.delete(floor.id)
    }
  }

  /**
   * If elevator is past the given floor.
   * Result depends on current MoveState.
   * Result is later used to decide if elevator can
   * stop at given floor, so this calculation is strict,
   * it returns false only if elevator has not entered the
   * floor's space (position, topPosition)
   */
  private isPast (floor: Floor): boolean {
    switch (this.moveState) {
      case MoveState.MovingDown:
        return this.position < floor.topPosition
      case MoveState.MovingUp:
        return this.topPosition > floor.bottomPosition
      default:
        return this.isIdleAt(floor)
    }
  }

  /**
   * Subscribe to elevator arrival at given floor
   */
  private async onArrival (floor: Floor): Promise<void> {
    const promisedArrival = this._arrivalMap.get(floor.id)
    if (promisedArrival != null) return await promisedArrival
    const arrivalPromise = new Resolvable()
    this._arrivalMap.set(floor.id, arrivalPromise)
    return await arrivalPromise
  }

  private async openDoors (): Promise<void> {
    // Only open doors when elevator is idle
    if (this.moveState === MoveState.Idle || this.moveProcess.isPaused) {
      this.doorState = DoorState.Open
      // Simulate doors opening duration
      // TODO: Refactor this to Doors class
      return await timer(Elevator.CLOSE_DURATION)
    }
  }

  /**
   * @param floors Floors serviced by this elevator
   */
  constructor (
    private readonly floors: Floor[],
    private readonly ctx: Settings
  ) { }

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
    if (!this.floors.includes(floor)) return false
    // If queue is empty, floor can be next
    if (this.queue.length === 0) {
      // Return distance from elevator to floor
      return Math.abs(this._position - floor.bottomPosition)
    }
    // Find where floor would be in the current queue
    let positionIndex = 0
    if (this.isPast(floor)) {
      positionIndex = this.queue.findIndex(queuedFloor =>
        this.moveState === MoveState.MovingUp
          ? queuedFloor < floor
          : queuedFloor > floor
      )
    } else {
      const canGoToNext = this.moveState === MoveState.MovingUp
        ? this.queue[0].number > floor.number
        : this.queue[0].number < floor.number
      if (canGoToNext) {
        // Return distance from elevator to floor
        return Math.abs(this._position - floor.bottomPosition)
      } else {
        // Otherwise find floor's next queue index
        positionIndex = this.queue.findIndex(queuedFloor =>
          this.moveState === MoveState.MovingUp
            ? queuedFloor > floor
            : queuedFloor < floor
        )
      }
    }
    if (positionIndex === -1) {
      positionIndex = this.queue.length
    }
    // Calculate distance between queued floors
    let distance = Math.abs(this.position - this.queue[0].bottomPosition)
    for (let i = 0; i < positionIndex; i++) {
      const queuedFloor = this.queue[i]
      const nextQueuedFloor = this.queue[i + 1]
      distance += nextQueuedFloor === undefined
        ? Math.abs(queuedFloor.bottomPosition - floor.bottomPosition)
        : Math.abs(queuedFloor.bottomPosition - nextQueuedFloor.bottomPosition)
    }
    return distance
  }

  /**
   * Efficiently positions floor in queue,
   * and returns "on floor arrival" promise
   */
  async goTo (floor: Floor): Promise<void> {
    // If floor is awaiting elevator, return queue promise
    if (this.queue.includes(floor)) return await this.onArrival(floor)
    // Only go to serviced floors
    if (!this.floors.includes(floor)) return
    // If queue is empty, no need to find insert position
    if (this.queue.length === 0) this.queue.push(floor)
    // Otherwise, find optimal position to queue floor.
    else if (this.isPast(floor)) {
      // If elevator is past floor, find best position to
      // queue the floor based on elevators move direction
      const positionIndex = this.queue.findIndex(queuedFloor =>
        this.moveState === MoveState.MovingUp
          ? queuedFloor < floor
          : queuedFloor > floor
      )
      // Floor should be queued last
      if (positionIndex === -1) this.queue.push(floor)
      // Floor should be placed before positionIndex
      else this.queue.splice(positionIndex, 0, floor)
    } else {
      // If elevator is not past floor
      // Check if floor can be next in queue
      const canGoToNext = this.moveState === MoveState.MovingUp
        ? this.queue[0].number > floor.number
        : this.queue[0].number < floor.number
      if (canGoToNext) {
        // Jump the queue
        this.moveToFloor = floor
        this.queue.unshift(floor)
      } else {
        // Otherwise find floor's next queue index
        const positionIndex = this.queue.findIndex(queuedFloor =>
          this.moveState === MoveState.MovingUp
            ? queuedFloor > floor
            : queuedFloor < floor
        )
        // Floor should be queued last
        if (positionIndex === -1) this.queue.push(floor)
        // Floor should be placed before positionIndex
        else this.queue.splice(positionIndex, 0, floor)
      }
    }
    // Assure queue process is running
    void (this.queueProcess.run())
    // Return queue promise for caller await
    return await this.onArrival(floor)
  }

  /**
   * Given floor should be one serviced by this elevator
   */
  isIdleAt (floor: Floor): boolean {
    const currentFloor = this.currentFloor?.number ?? -1
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
      await this.openDoors()
    }
    return await this.releaseClose()
  }

  /**
   * Stop, or resume, elevator movement
   */
  toggleStop (): void {
    // Currently, elevator movement can only
    // be pause by the toggleStop method
    if (this.moveProcess.isPaused) void (this.moveProcess.run())
    else void (this.moveProcess.pause())
  }
}
