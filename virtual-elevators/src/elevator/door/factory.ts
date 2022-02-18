import { inject, singleton } from 'tsyringe'
import { Immutable } from '/src/pkg/immutable'
import { IElevatorDoor, IElevatorDoorRecord } from './model'
import { elevatorDoorPosition } from './model/position'
import { elevatorDoorStatus } from './model/status'

@singleton()
export class ElevatorDoorFactory {
  private readonly _ElevatorDoorRecord = this._immutable.Record<IElevatorDoor>({
    status: elevatorDoorStatus.Closed,
    position: elevatorDoorPosition.Closed
  })

  constructor (
    @inject(Immutable) private readonly _immutable: Immutable
  ) {}

  create (state?: Partial<IElevatorDoor>): IElevatorDoorRecord {
    return this._ElevatorDoorRecord(state)
  }
}
