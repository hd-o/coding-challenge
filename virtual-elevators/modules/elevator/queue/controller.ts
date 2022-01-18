import { inject, singleton } from 'tsyringe'
import { FloorCtrl } from '~/floor/controller'
import { IFloor } from '~/floor/model'
import { Settings$ } from '~/settings/stream'
import { IElevator } from '../model'
import { ElevatorPositionCtrl } from '../position/controller'
import { ElevatorQueueSet, IElevatorQueue } from './model'
import { ElevatorQueueState, elevatorQueueState } from './moveState'
import { elevatorQueueSetType, ElevatorQueueSetType } from './queueSetType'
import { ElevatorQueue$ } from './stream'

interface QueueIndex {
  setType: ElevatorQueueSetType
  index: number
}

@singleton()
export class ElevatorQueueCtrl {
  private _getActiveQueueSet (elevator: IElevator): ElevatorQueueSet {
    const queue = this._getQueue(elevator)
    return this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.movingUp
      : queue.movingDown
  }

  private _getInactiveQueueSet (elevator: IElevator): ElevatorQueueSet {
    const queue = this._getQueue(elevator)
    return this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.movingDown
      : queue.movingUp
  }

  private _getInsertIndex (elevator: IElevator, floor: IFloor): QueueIndex {
    const isPastFloor = this._isPastFloor(elevator, floor)
    const queueSet = isPastFloor
      ? this._getInactiveQueueSet(elevator)
      : this._getActiveQueueSet(elevator)
    const setType = this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? (isPastFloor ? elevatorQueueSetType.MovingDown : elevatorQueueSetType.MovingUp)
      : (isPastFloor ? elevatorQueueSetType.MovingUp : elevatorQueueSetType.MovingDown)
    if (queueSet.size === 0) {
      return { setType, index: 0 }
    }
    const findComparator = setType === elevatorQueueState.MovingUp
      ? (a: IFloor, b: IFloor) => a.number < b.number
      : (a: IFloor, b: IFloor) => a.number > b.number
    const index = queueSet.find(queuedFloor => findComparator(queuedFloor, floor)) ?? 0
    return { setType, index }
  }

  private _getNextFloor (elevator: IElevator): IFloor | undefined {
    const queue = this._getQueue(elevator)
    return this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.movingUp.first
      : queue.movingDown.first
  }

  private _getQueue (elevator: IElevator): IElevatorQueue {
    /** @see {ElevatorQueues$} - Creates queues for all elevators */
    return this._elevatorsQueues$.value.get(elevator.id)?.value as IElevatorQueue
  }

  private _getQueueState (elevator: IElevator): ElevatorQueueState {
    return this._getQueue(elevator).state
  }

  private _getTotalQueueSize (elevator: IElevator): number {
    const queue = this._getQueue(elevator)
    return queue.movingDown.size + queue.movingUp.size
  }

  /**
   * Result is later used to decide if elevator can stop at given floor
   * @returns False only if elevator has not entered the floor's area
   */
  private _isPastFloor (elevator: IElevator, floor: IFloor): boolean {
    switch (this._getQueueState(elevator)) {
      case elevatorQueueState.MovingDown:
        return this._elevatorPositionCtrl.getPosition(elevator) < this._floorCtrl.getTopPosition(floor)
      case elevatorQueueState.MovingUp:
        return this._elevatorPositionCtrl.getTopPosition(elevator) > this._floorCtrl.getPosition(floor)
      default:
        return this._elevatorPositionCtrl.isAtFloor(elevator, floor)
    }
  }

  constructor (
    @inject(ElevatorQueue$) private readonly _elevatorsQueues$: ElevatorQueue$,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl,
    @inject(ElevatorPositionCtrl) private readonly _elevatorPositionCtrl: ElevatorPositionCtrl,
    @inject(Settings$) private readonly _settings$: Settings$
  ) {}

  /**
   * Elevator's distance to a given floor =
   * distance between stops until floor + distance from last stop to floor.
   * Or, if floor is next, distance from elevator to floor
   * @returns False if floor is not serviced, or distance in floor height unit
   */
  getDistance (elevator: IElevator, floor: IFloor): number | false {
    // Check if floor is serviced by elevator
    if (!elevator.floors.includes(floor)) return false
    // Start with distance from elevator to next floor
    const activeQueuedFloors = [...this._getActiveQueueSet(elevator)]
    const nextFloor = activeQueuedFloors[0]
    // If queue is empty, floor can be next
    if (nextFloor === undefined) {
      // Return distance from elevator to floor
      return Math.abs(
        this._elevatorPositionCtrl.getPosition(elevator) -
        this._floorCtrl.getPosition(floor)
      )
    }
    let distance = (
      this._elevatorPositionCtrl.getPosition(elevator) +
      this._floorCtrl.getPosition(nextFloor)
    )
    const insertIndex = this._getInsertIndex(elevator, floor)
    if (this._isPastFloor(elevator, floor)) {
      activeQueuedFloors.slice(1).forEach(() => {
        distance += this._settings$.value.floorHeight
      })
    }
    // Find where floor would be in the current queue
    // let positionIndex = 0
    // if (this._isPast(elevator, floor)) {
    //   positionIndex =
    //     this._getQueueState(elevator) === ElevatorQueueState.MovingUp
    //       ? queue.movingUp.findKey((queuedFloor) => queuedFloor < floor.number)
    //       : queue.movingDown.findKey((queuedFloor) => queuedFloor > floor.number)
    // } else {
    //   const nextFloor = this._elevatorQueueCtrl.getNextFloor()
    //   if (nextFloor === undefined) return false
    //   const canGoToNext = this._moveState === MoveState.MovingUp
    //     ? nextFloor.number > floor.number
    //     : nextFloor.number < floor.number
    //   if (canGoToNext) {
    //     // Return distance from elevator to floor
    //     return Math.abs(this._position - floor.bottomPosition)
    //   } else {
    //     // Otherwise find floor's next queue index
    //     positionIndex = this._queue.findIndex(queuedFloor =>
    //       this._moveState === MoveState.MovingUp
    //         ? queuedFloor > floor
    //         : queuedFloor < floor
    //     )
    //   }
    // }
    // if (positionIndex === -1) {
    //   positionIndex = this._queue.size
    // }
    // const nextFloor = this._queue.get(0)
    // if (nextFloor === undefined) return 0
    // // Calculate distance between queued floors
    // let distance = Math.abs(this.position - nextFloor.bottomPosition)
    // for (let i = 0; i < positionIndex; i++) {
    //   const queuedFloor = this._queue.get(i)
    //   if (queuedFloor === undefined) break
    //   const nextQueuedFloor = this._queue.get(i + 1)
    //   if (nextQueuedFloor === undefined) break
    //   distance += nextQueuedFloor === undefined
    //     ? Math.abs(queuedFloor.bottomPosition - floor.bottomPosition)
    //     : Math.abs(queuedFloor.bottomPosition - nextQueuedFloor.bottomPosition)
    // }
    // return distance
  }

  insert (elevator: IElevator, floor: IFloor): void {}
}
