import { FloorCtrl } from '/src/floor/controller'
import { IFloorRecord } from '/src/floor/model'
import { Settings$ } from '/src/settings/stream'
import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { ElevatorDoorCtrl } from '../door/controller'
import { IElevatorRecord } from '../model'
import { ElevatorPositionCtrl } from '../position/controller'
import { IElevatorQueueSet } from './model'
import { elevatorDirectionType, IElevatorDirectionType } from './model/directionType'
import { elevatorQueueState, IElevatorQueueState } from './model/moveState'
import { ElevatorQueue$Map$, IElevatorQueue$, IElevatorQueueRecord } from './stream'

interface QueueIndex {
  directionType: IElevatorDirectionType
  index: number
}

@singleton()
export class ElevatorQueueCtrl {
  private _getActiveQueueSet (elevator: IElevatorRecord): IElevatorQueueSet {
    const queue = this._getQueue(elevator)
    return this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.MovingUp
      : queue.MovingDown
  }

  private _getInactiveQueueSet (elevator: IElevatorRecord): IElevatorQueueSet {
    const queue = this._getQueue(elevator)
    return this._getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.MovingDown
      : queue.MovingUp
  }

  private _getFloorInsertIndex (elevator: IElevatorRecord, floor: IFloorRecord): QueueIndex {
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

  private _getQueue$ (elevator: IElevatorRecord): IElevatorQueue$ {
    /** @see {ElevatorQueue$} - Creates queues for all elevators */
    return this._elevatorQueue$.value.get(elevator.id) as IElevatorQueue$
  }

  private _getQueue (elevator: IElevatorRecord): IElevatorQueueRecord {
    return this._getQueue$(elevator).value
  }

  private _getQueueState (elevator: IElevatorRecord): IElevatorQueueState {
    return this._getQueue(elevator).state
  }

  getTotalQueueSize (elevator: IElevatorRecord): number {
    const queue = this._getQueue(elevator)
    return queue.MovingDown.size + queue.MovingUp.size
  }

  /**
   * Result is later used to decide if elevator can stop at given floor
   * @returns False only if elevator has not entered the floor's area
   */
  private _isPastFloor (elevator: IElevatorRecord, floor: IFloorRecord): boolean {
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
    @inject(ElevatorDoorCtrl) private readonly _doorCtrl: ElevatorDoorCtrl,
    @inject(ElevatorQueue$Map$) private readonly _elevatorQueue$: ElevatorQueue$Map$,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl,
    @inject(ElevatorPositionCtrl) private readonly _elevatorPositionCtrl: ElevatorPositionCtrl,
    @inject(Settings$) private readonly _settings$: Settings$
  ) {}

  getOppositeDirection (direction: IElevatorDirectionType): IElevatorDirectionType {
    return direction === elevatorDirectionType.MovingDown
      ? elevatorDirectionType.MovingUp
      : elevatorDirectionType.MovingDown
  }

  getQueue$ (elevator: IElevatorRecord): IElevatorQueue$ {
    return this._getQueue$(elevator)
  }

  insert (elevator: IElevatorRecord, floor: IFloorRecord): void {
    if (this.isGoingToFloor(elevator, floor)) return
    const { directionType } = this._getFloorInsertIndex(elevator, floor)
    const queue = this._getQueue(elevator)
    const directionSetUpdate = queue[directionType].add(floor)
    let queueUpdate = queue.set(directionType, directionSetUpdate)
    if (queue.state === elevatorQueueState.Idle) {
      queueUpdate = queueUpdate.set('state', directionType)
    }
    if (this._elevatorPositionCtrl.isAtFloor(elevator, floor)) {
      this._doorCtrl.open(elevator)
    } else {
      this._getQueue$(elevator).next(queueUpdate)
      this._floorCtrl.setHasRequestedElevator(floor, true)
    }
  }

  isGoingToFloor (elevator: IElevatorRecord, floor: IFloorRecord): boolean {
    const queue = this._getQueue(elevator)
    return queue.MovingUp.has(floor) || queue.MovingDown.has(floor)
  }

  isQueueEmpty (elevator: IElevatorRecord): boolean {
    return this.getTotalQueueSize(elevator) === 0
  }

  remove (elevator: IElevatorRecord, directionType: IElevatorDirectionType, floor: IFloorRecord): void {
    const queue$ = this.getQueue$(elevator)
    const queueSetUpdate = queue$.value[directionType].delete(floor)
    let queueUpdate = queue$.value.set(directionType, queueSetUpdate)
    if (queueUpdate.state === directionType && queueSetUpdate.size === 0) {
      const oppositeDirection = this.getOppositeDirection(directionType)
      const stateUpdate = queueUpdate[oppositeDirection].size > 0
        ? oppositeDirection
        : elevatorQueueState.Idle
      queueUpdate = queueUpdate.set('state', stateUpdate)
    }
    queue$.next(queueUpdate)
  }
}

export const ElevatorQueueCtrlCtx = createContext(() => container.resolve(ElevatorQueueCtrl))
