import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevatorDoor } from './model'
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

  create (): RecordOf<IElevatorDoor> {
    return this._ElevatorDoorRecord()
  }
}
