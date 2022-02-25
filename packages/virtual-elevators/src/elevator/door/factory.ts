import { Immutable } from '/src/pkg/immutable'
import { inject, singleton } from 'tsyringe'
import { IElevatorDoor, IElevatorDoorRecord } from './model'
import { elevatorDoorPosition } from './model/position'
import { elevatorDoorStatus } from './model/status'

@singleton()
export class ElevatorDoorFactory {
  constructor (
    @inject(Immutable) private readonly _immutable: Immutable
  ) {}

  private readonly _ElevatorDoorRecord = this._immutable.Record<IElevatorDoor>({
    status: elevatorDoorStatus.Closed,
    position: elevatorDoorPosition.Closed,
  })

  create (state?: Partial<IElevatorDoor>): IElevatorDoorRecord {
    return this._ElevatorDoorRecord(state)
  }
}
