import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { ElevatorDoor$ } from './stream'
import { IElevator } from '../model'
import { ElevatorMoveState } from '../moveState'
import { ElevatorDoorFactory } from './factory'
import { IElevatorDoor } from './model'

@singleton()
export class ElevatorDoorCtrl {
  private _getOrCreateDoor (elevator: IElevator): RecordOf<IElevatorDoor> {
    const doors = this._elevatorDoors$.value
    const door = doors.get(elevator.id)
    if (door === undefined) {
      const newDoor = this._elevatorDoorFactory.create()
      this._elevatorDoors$.next(doors.set(elevator.id, newDoor))
      return newDoor
    }
    return door
  }

  constructor (
    @inject(ElevatorDoor$) private readonly _elevatorDoors$: ElevatorDoor$,
    @inject(ElevatorDoorFactory) private readonly _elevatorDoorFactory: ElevatorDoorFactory
  ) {}

  open (elevator: IElevator): void {
    // Only open if elevator is not moving
    if (elevator.moveState !== ElevatorMoveState.Idle) return
    const door = this._getOrCreateDoor(elevator).set('open', true)
    const doorsUpdate = this._elevatorDoors$.value.set(elevator.id, door)
    this._elevatorDoors$.next(doorsUpdate)
  }
}
