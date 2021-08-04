import { uniqueId } from 'lodash'
import { ModelContext } from '../Context'
import { Floor } from './Floor'
import { Processor } from './Processor'
import { Resolvable } from './Resolvable'
import { timer } from './timer'

/**
 * Identifies if, or to which direction,
 * an elevator is moving. 
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
 * Class controlling an Elevator unit
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
   * @see this.onArrival
   * @see this.arrivedAt
   */
  private arrivalMap = new Map<string, Resolvable>()
  /**
   * Processor managing door closing
   */
  private doorCloseProcessor = new Processor<undefined>({
    before: () => {
      this.doorState = DoorState.Closing
      // Doors should stay open for a short period
      // so passangers can block its close if needed
      return timer(3000)
    },
    after: () => (this.doorState = DoorState.Closed),
    process: () => timer(Elevator.CLOSE_DURATION),
    onPause: () => this.openDoors(),
  })
  /**
   * @see {@link DoorState}
   */
  public doorState = DoorState.Closed
  /**
   * Where elevator is currently moving to
   */
  private moveToFloor: Floor | null = null
  /**
   * Manages elevator movement, including pause/resume
   */
  private moveProcess = new Processor<{ interval: number }>({
    // A setInterval timer enables pausing the movement
    initialState: { interval: -1 },
    before: () => this.doorCloseProcessor.run(),
    onPause: (state) => clearInterval(state.interval),
    process: (state) => new Promise<void>(resolve => {
      const move = () => {
        if (
          !this.moveToFloor ||
          // Process ends when elevator arrives at floor
          this._position === this.moveToFloor.position
        ) {
          return resolve()
        }
        switch(this.moveState) {
          case MoveState.MovingUp: return ++this._position
          case MoveState.MovingDown: return --this._position
          default: return resolve()
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
  private queue: Floor[] = []
  /**
   * Manage processing queued floor requests
   */
  private queueProcess = new Processor({
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
      return this.moveProcess.run()
    },
    after: () => {
      this.queue.shift()
      this.moveState = MoveState.Idle
      // Same as moveProcess, a queue process
      // only ends on serviced floor arrival
      this.arrivedAt(this.currentFloor as Floor)
      if (this.queue.length) this.queueProcess.run()
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
  private get currentFloor() {
    return this.floors.find((floor) => {
      switch (this.moveState) {
        case MoveState.Idle:
          return this.position === floor.position
        case MoveState.MovingDown:
          return this.position < floor.topPosition
        case MoveState.MovingUp:
          return this.topPosition > floor.position
        default:
          return false
      }
    })
  }
  /**
   * Position of this elevator's ceiling
   */
  private get topPosition() {
    return this.position + this.ctx.floorHeight
  }
  /**
   * After elevator has arrived at given floor.
   * Resolve the floor's arrivalMap promise
   */
  private arrivedAt(floor: Floor) {
    if (this.arrivalMap.get(floor.id)?.resolve()) {
      this.arrivalMap.delete(floor.id)
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
  private isPast(floor: Floor) {
    switch (this.moveState) {
      case MoveState.MovingDown:
        return this.position < floor.topPosition
      case MoveState.MovingUp:
        return this.topPosition > floor.position
      default:
        return this.isIdleAt(floor)
    }
  }
  /**
   * Subscribe to elevator arrival at given floor
   */
  private onArrival(floor: Floor) {
    const promisedArrival = this.arrivalMap.get(floor.id)
    if (promisedArrival) return promisedArrival
    const arrivalPromise = new Resolvable()
    this.arrivalMap.set(floor.id, arrivalPromise)
    return arrivalPromise
  }
  /**
   * Only open doors when elevator is idle
   */
  private openDoors() {
    if (this.moveState === MoveState.Idle || this.moveProcess.isPaused) {
      this.doorState = DoorState.Open
      // Simulate doors opening duration
      // TODO: Refactor this to Doors class
      return timer(Elevator.CLOSE_DURATION)
    }
  }
  /**
   * @param floors Floors serviced by this elevator
   */
  constructor(
    private floors: Floor[],
    private ctx: ModelContext,
  ) { }
  /**
   * Used by external code.
   * Example in UI rendering loops
   */
  public id = uniqueId()
  /**
   * Current elevator position
   * In height unit, not floors
   */
  public get position() {
    return this._position
  }
  /**
   * Temporarily prevent closing of elevator doors
   */
  public blockClose() {
    return this.doorCloseProcessor.pause()
  }
  /**
   * Elevator's distance to a given floor =
   * Distance between stops +
   * Distance from last stop to floor
   * @returns
   * False if floor is not serviced,
   * or distance in height units
   */
  public distanceTo(floor: Floor): false | number {
    if (!this.floors.includes(floor)) return false
    return 0
  }
  /**
   * Efficiently positions floor in queue,
   * and returns "on floor arrival" promise
   */
  public async goTo(floor: Floor): Promise<void> {
    // If floor is awaiting elevator, return queue promise
    if (this.queue.includes(floor)) return this.onArrival(floor)
    // Only go to serviced floors
    if (!this.floors.includes(floor)) return
    // If queue is empty, no need to find insert position
    if (!this.queue.length) this.queue.push(floor)
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
      if (positionIndex == -1) this.queue.push(floor)
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
        if (positionIndex == -1) this.queue.push(floor)
        // Floor should be placed before positionIndex
        else this.queue.splice(positionIndex, 0, floor)
      }
    }
    // Assure queue process is running
    this.queueProcess.run()
    // Return queue promise for caller await
    return this.onArrival(floor)
  }
  /**
   * Given floor should be one serviced by this elevator
   */
  public isIdleAt(floor: Floor) {
    const currentFloor = this.currentFloor?.number
    return currentFloor && currentFloor === floor.number
  }
  /**
   * Release closing of elevator doors.
   * Normally called after this.blockClose
   */
  public releaseClose() {
    return this.doorCloseProcessor.reset()
  }
  /**
   * Open elevator doors, or block doors from closing
   */
  public async open() {
    if (this.doorCloseProcessor.isRunning) {
      await this.blockClose()
    } else {
      await this.openDoors()
    }
    return this.releaseClose()
  }
  /**
   * Stop, or resume, elevator movement
   */
  public toggleStop() {
    // Currently, elevator movement can only
    // be pause by the toggleStop method
    if (this.moveProcess.isPaused) this.moveProcess.run()
    else this.moveProcess.pause()
  }
}
