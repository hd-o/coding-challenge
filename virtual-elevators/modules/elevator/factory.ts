import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevator } from './model'

@singleton()
export class ElevatorFactory {
  constructor (
    _: any,
    @inject(Immutable) immutable: Immutable,
    private readonly _ElevatorRecord = immutable.Record({
      id: '',
      position: 0
    })
  ) {}

  create (state: Partial<IElevator>): RecordOf<IElevator> {
    return this._ElevatorRecord(state)
  }
}
