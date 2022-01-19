import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevatorDoor } from './model'

@singleton()
export class ElevatorDoorFactory {
  private readonly _ElevatorDoorRecord = this._immutable.Record<IElevatorDoor>({
    open: false
  })

  constructor (
    @inject(Immutable) private readonly _immutable: Immutable
  ) {}

  create (): RecordOf<IElevatorDoor> {
    return this._ElevatorDoorRecord()
  }
}
