import { inject, singleton } from 'tsyringe'
import { IElevator } from '../model'
import { ElevatorMoveState } from '../moveState'
import { ElevatorDoor$, ElevatorDoorUnit$ } from './stream'

@singleton()
export class ElevatorDoorCtrl {
  constructor (
    @inject(ElevatorDoor$) private readonly _elevatorDoors$: ElevatorDoor$
  ) {}

  open (elevator: IElevator): void {
    // Only open if elevator is not moving
    if (elevator.moveState !== ElevatorMoveState.Idle) return
    const doorUnit$ = this._elevatorDoors$.value.get(elevator) as ElevatorDoorUnit$
    doorUnit$.next(doorUnit$.value.set('open', true))
  }
}
