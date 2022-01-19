import { inject, singleton } from 'tsyringe'
import { FloorCtrl } from '~/floor/controller'
import { IFloor } from '~/floor/model'
import { Settings$ } from '~/settings/stream'
import { IElevator } from '../model'
import { ElevatorPositionCtrl } from '../position/controller'
import { ElevatorQueueSet } from './model'
import { ElevatorDirectionType, elevatorDirectionType } from './model/directionType'
import { ElevatorQueueState, elevatorQueueState } from './model/moveState'
import { ElevatorQueue$ } from './stream'
import { IElevatorQueueUnit$, IElevatorQueueUnitRecord } from './stream/unit'

interface QueueIndex {
  directionType: ElevatorDirectionType
  index: number
}

@singleton()
export class ElevatorQueueCtrl {
  private _getActiveQueueSet (elevator: IElevator): ElevatorQueueSet {
    const queue = this._getQueue(elevator)
    return this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.MovingUp
      : queue.MovingDown
  }

  private _getInactiveQueueSet (elevator: IElevator): ElevatorQueueSet {
    const queue = this._getQueue(elevator)
    return this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.MovingDown
      : queue.MovingUp
  }

  private _getFloorInsertIndex (elevator: IElevator, floor: IFloor): QueueIndex {
    const isPastFloor = this._isPastFloor(elevator, floor)
    const queueSet = isPastFloor
      ? this._getInactiveQueueSet(elevator)
      : this._getActiveQueueSet(elevator)
    const setType = this._getQueueState(elevator) !== elevatorQueueState.MovingUp
      ? (isPastFloor ? elevatorDirectionType.MovingDown : elevatorDirectionType.MovingUp)
      : (isPastFloor ? elevatorDirectionType.MovingUp : elevatorDirectionType.MovingDown)
    if (queueSet.size === 0) return { directionType: setType, index: 0 }
    const index = queueSet.add(floor).toArray().indexOf(floor)
    return { directionType: setType, index }
  }

  private _getQueueUnit$ (elevator: IElevator): IElevatorQueueUnit$ {
    /** @see {ElevatorQueue$} - Creates queues for all elevators */
    return this._elevatorsQueue$.value.get(elevator) as IElevatorQueueUnit$
  }

  private _getQueue (elevator: IElevator): IElevatorQueueUnitRecord {
    return this._getQueueUnit$(elevator).value
  }

  private _getQueueState (elevator: IElevator): ElevatorQueueState {
    return this._getQueue(elevator).state
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
        return this._elevatorPositionCtrl.isOverFloor(elevator, floor)
    }
  }

  constructor (
    @inject(ElevatorQueue$) private readonly _elevatorsQueue$: ElevatorQueue$,
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
    const activeQueuedFloors = this._getActiveQueueSet(elevator).toArray()
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
    const floorInsertIndex = this._getFloorInsertIndex(elevator, floor)
    const isPastFloor = this._isPastFloor(elevator, floor)
    activeQueuedFloors
      .slice(1, isPastFloor ? undefined : floorInsertIndex.index)
      .forEach(() => { distance += this._settings$.value.floorHeight })
    if (isPastFloor) {
      this
        ._getInactiveQueueSet(elevator)
        .toArray()
        .slice(0, floorInsertIndex.index)
        .forEach(() => { distance += this._settings$.value.floorHeight })
    }
    return distance
  }

  insert (elevator: IElevator, floor: IFloor): void {
    const { directionType } = this._getFloorInsertIndex(elevator, floor)
    const queue = this._getQueue(elevator)
    const directionSetUpdate = queue[directionType].add(floor)
    const queueUpdate = queue
      .set(directionType, directionSetUpdate)
      .set('state', directionType)
    this._getQueueUnit$(elevator).next(queueUpdate)
    this._floorCtrl.setHasRequestedElevator(floor, true)
  }
}
