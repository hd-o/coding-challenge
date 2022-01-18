import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { Floor$ } from '~/floor/stream'
import { Immutable } from '~/pkg/immutable'
import { Settings$ } from '~/settings/stream'
import { IElevator } from './model'
import { ElevatorMoveState } from './moveState'

@singleton()
export class ElevatorFactory {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    @inject(Floor$) readonly floors$: Floor$,
    @inject(Settings$) readonly settings$: Settings$,
    private readonly _ElevatorRecord = immutable.Record<IElevator>({
      id: '',
      floors: floors$.value,
      moveState: ElevatorMoveState.Idle
    })
  ) {}

  create (state: Partial<IElevator>): RecordOf<IElevator> {
    return this._ElevatorRecord(state)
  }
}
