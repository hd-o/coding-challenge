import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevatorDoor } from './model'

@singleton()
export class ElevatorDoorFactory {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    private readonly _ElevatorDoorRecord = immutable.Record<IElevatorDoor>({
      open: false
    })
  ) {}

  create (): RecordOf<IElevatorDoor> {
    return this._ElevatorDoorRecord()
  }
}
