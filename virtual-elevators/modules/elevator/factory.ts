import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { Floor$ } from '~/floor/stream'
import { Immutable } from '~/pkg/immutable'
import { IElevator } from './model'
import { ElevatorMoveState } from './moveState'

@singleton()
export class ElevatorFactory {
  private readonly _ElevatorRecord = this._immutable.Record<IElevator>({
    id: '',
    floors: this._floors$.value,
    moveState: ElevatorMoveState.Idle
  })

  constructor (
    @inject(Immutable) private readonly _immutable: Immutable,
    @inject(Floor$) private readonly _floors$: Floor$
  ) {}

  create (state?: Partial<IElevator>): RecordOf<IElevator> {
    return this._ElevatorRecord(state)
  }
}
