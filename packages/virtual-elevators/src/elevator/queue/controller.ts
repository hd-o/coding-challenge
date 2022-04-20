import { FloorCtrl } from '/src/floor/controller'
import { IFloorRecord } from '/src/floor/model'
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
  constructor (
    @inject(ElevatorDoorCtrl) private readonly _doorCtrl: ElevatorDoorCtrl,
    @inject(ElevatorQueue$Map$) private readonly _elevatorQueue$: ElevatorQueue$Map$,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl,
    @inject(ElevatorPositionCtrl) private readonly _elevatorPositionCtrl: ElevatorPositionCtrl
  ) { }

  getActiveQueueSet (elevator: IElevatorRecord): IElevatorQueueSet {
    const queue = this.getQueue(elevator)
    return this.getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.MovingUp
      : queue.MovingDown
  }

  getFloorInsertIndex (elevator: IElevatorRecord, floor: IFloorRecord): QueueIndex {
    const isPastFloor = this.isPastFloor(elevator, floor)
    const queueSet = isPastFloor
      ? this.getInactiveQueueSet(elevator)
      : this.getActiveQueueSet(elevator)
    const setType = this.getQueueState(elevator) === elevatorQueueState.MovingDown
      ? (isPastFloor ? elevatorDirectionType.MovingUp : elevatorDirectionType.MovingDown)
      : (isPastFloor ? elevatorDirectionType.MovingDown : elevatorDirectionType.MovingUp)
    if (queueSet.size === 0) return { directionType: setType, index: 0 }
    const index = queueSet.add(floor).toArray().indexOf(floor)
    return { directionType: setType, index }
  }

  getInactiveQueueSet (elevator: IElevatorRecord): IElevatorQueueSet {
    const queue = this.getQueue(elevator)
    return this.getQueueState(elevator) === elevatorQueueState.MovingUp
      ? queue.MovingDown
      : queue.MovingUp
  }

  getOppositeDirection (direction: IElevatorDirectionType): IElevatorDirectionType {
    return direction === elevatorDirectionType.MovingDown
      ? elevatorDirectionType.MovingUp
      : elevatorDirectionType.MovingDown
  }

  getQueue (elevator: IElevatorRecord): IElevatorQueueRecord {
    return this.getQueue$(elevator).value
  }

  getQueue$ (elevator: IElevatorRecord): IElevatorQueue$ {
    /** @see {ElevatorQueue$} - Creates queues for all elevators */
    return this._elevatorQueue$.value.get(elevator.id) as IElevatorQueue$
  }

  getQueueState (elevator: IElevatorRecord): IElevatorQueueState {
    return this.getQueue(elevator).state
  }

  getTotalQueueSize (elevator: IElevatorRecord): number {
    const queue = this.getQueue(elevator)
    return queue.MovingDown.size + queue.MovingUp.size
  }

  insert (elevator: IElevatorRecord, floor: IFloorRecord): void {
    if (this.isGoingToFloor(elevator, floor)) return
    const { directionType } = this.getFloorInsertIndex(elevator, floor)
    const queue = this.getQueue(elevator)
    const directionSetUpdate = queue[directionType].add(floor)
    let queueUpdate = queue.set(directionType, directionSetUpdate)
    if (queue.state === elevatorQueueState.Idle) {
      queueUpdate = queueUpdate.set('state', directionType)
    }
    if (this._elevatorPositionCtrl.isAtFloor(elevator, floor)) {
      this._doorCtrl.open(elevator)
    } else {
      this.getQueue$(elevator).next(queueUpdate)
      this._floorCtrl.setHasRequestedElevator(floor, true)
    }
  }

  isGoingToFloor (elevator: IElevatorRecord, floor: IFloorRecord): boolean {
    const queue = this.getQueue(elevator)
    return queue.MovingUp.has(floor) || queue.MovingDown.has(floor)
  }

  /**
   * Result is later used to decide if elevator can stop at given floor
   * @returns False only if elevator has not entered the floor's area
   */
  isPastFloor (elevator: IElevatorRecord, floor: IFloorRecord): boolean {
    switch (this.getQueueState(elevator)) {
      case elevatorQueueState.MovingDown:
        return this._elevatorPositionCtrl.getPosition(elevator) < this._floorCtrl.getTopPosition(floor)
      case elevatorQueueState.MovingUp:
        return this._elevatorPositionCtrl.getTopPosition(elevator) > this._floorCtrl.getPosition(floor)
      default:
        return this._elevatorPositionCtrl.isOverFloor(elevator, floor)
    }
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

export const useElevatorQueueCtrl =
  (): ElevatorQueueCtrl => container.resolve(ElevatorQueueCtrl)
