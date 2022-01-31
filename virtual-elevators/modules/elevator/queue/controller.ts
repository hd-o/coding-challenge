import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { FloorCtrl } from '~/floor/controller'
import { IFloor } from '~/floor/model'
import { Settings$ } from '~/settings/stream'
import { ElevatorRecord } from '../model'
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
  private _getActiveQueueSet (elevator: ElevatorRecord): ElevatorQueueSet {
    const queue = this._getQueue(elevator)
    return this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.MovingUp
      : queue.MovingDown
  }

  private _getInactiveQueueSet (elevator: ElevatorRecord): ElevatorQueueSet {
    const queue = this._getQueue(elevator)
    return this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.MovingDown
      : queue.MovingUp
  }

  private _getFloorInsertIndex (elevator: ElevatorRecord, floor: IFloor): QueueIndex {
    const isPastFloor = this._isPastFloor(elevator, floor)
    const queueSet = isPastFloor
      ? this._getInactiveQueueSet(elevator)
      : this._getActiveQueueSet(elevator)
    const setType = this._getQueueState(elevator) === elevatorQueueState.MovingDown
      ? (isPastFloor ? elevatorDirectionType.MovingUp : elevatorDirectionType.MovingDown)
      : (isPastFloor ? elevatorDirectionType.MovingDown : elevatorDirectionType.MovingUp)
    if (queueSet.size === 0) return { directionType: setType, index: 0 }
    const index = queueSet.add(floor).toArray().indexOf(floor)
    return { directionType: setType, index }
  }

  private _getQueueUnit$ (elevator: ElevatorRecord): IElevatorQueueUnit$ {
    // TODO: Stop using .value for BehaviorSubject access
    // TODO: Use $ for click handlers, and merge value with other $s
    /** @see {ElevatorQueue$} - Creates queues for all elevators */
    return this._elevatorQueue$.value.get(elevator.id) as IElevatorQueueUnit$
  }

  private _getQueue (elevator: ElevatorRecord): IElevatorQueueUnitRecord {
    return this._getQueueUnit$(elevator).value
  }

  private _getQueueState (elevator: ElevatorRecord): ElevatorQueueState {
    return this._getQueue(elevator).state
  }

  private _getTotalQueueSize (elevator: ElevatorRecord): number {
    const queue = this._getQueue(elevator)
    return queue.MovingDown.size + queue.MovingUp.size
  }

  /**
   * Result is later used to decide if elevator can stop at given floor
   * @returns False only if elevator has not entered the floor's area
   */
  private _isPastFloor (elevator: ElevatorRecord, floor: IFloor): boolean {
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
    @inject(ElevatorQueue$) private readonly _elevatorQueue$: ElevatorQueue$,
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
  getDistance (elevator: ElevatorRecord, floor: IFloor): number | false {
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

  getOppositeDirection (direction: ElevatorDirectionType): ElevatorDirectionType {
    return direction === elevatorDirectionType.MovingDown
      ? elevatorDirectionType.MovingUp
      : elevatorDirectionType.MovingDown
  }

  getQueueUnit$ (elevator: ElevatorRecord): IElevatorQueueUnit$ {
    return this._getQueueUnit$(elevator)
  }

  insert (elevator: ElevatorRecord, floor: IFloor): void {
    if (this.isGoingToFloor(elevator, floor)) return
    const { directionType } = this._getFloorInsertIndex(elevator, floor)
    const queue = this._getQueue(elevator)
    const directionSetUpdate = queue[directionType].add(floor)
    let queueUpdate = queue.set(directionType, directionSetUpdate)
    if (queue.state === elevatorQueueState.Idle) {
      queueUpdate = queueUpdate.set('state', directionType)
    }
    this._getQueueUnit$(elevator).next(queueUpdate)
    this._floorCtrl.setHasRequestedElevator(floor, true)
  }

  isGoingToFloor (elevator: ElevatorRecord, floor: IFloor): boolean {
    const queue = this._getQueue(elevator)
    return queue.MovingUp.has(floor) || queue.MovingDown.has(floor)
  }

  isQueueEmpty (elevator: ElevatorRecord): boolean {
    return this._getTotalQueueSize(elevator) === 0
  }

  remove (elevator: ElevatorRecord, directionType: ElevatorDirectionType, floor: IFloor): void {
    const queueUnit$ = this.getQueueUnit$(elevator)
    const queueSetUpdate = queueUnit$.value[directionType].delete(floor)
    let queueUpdate = queueUnit$.value.set(directionType, queueSetUpdate)
    if (queueUpdate.state === directionType && queueSetUpdate.size === 0) {
      const oppositeDirection = this.getOppositeDirection(directionType)
      const stateUpdate = queueUpdate[oppositeDirection].size > 0
        ? oppositeDirection
        : elevatorQueueState.Idle
      queueUpdate = queueUpdate.set('state', stateUpdate)
    }
    queueUnit$.next(queueUpdate)
  }
}

export const ElevatorQueueCtrlCtx = createContext(container.resolve(ElevatorQueueCtrl))
