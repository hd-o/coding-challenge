import { FloorList$ } from '/src/floor/stream'
import { Immutable } from '/src/pkg/immutable'
import { inject, singleton } from 'tsyringe'
import { IElevator, IElevatorRecord } from './model'
import { ElevatorMoveState } from './moveState'

@singleton()
export class ElevatorFactory {
  private readonly _ElevatorRecord = this._immutable.Record<IElevator>({
    id: '',
    floors: this._floors$.value,
    moveState: ElevatorMoveState.Idle,
  })

  constructor (
    @inject(Immutable) private readonly _immutable: Immutable,
    @inject(FloorList$) private readonly _floors$: FloorList$
  ) {}

  create (state?: Partial<IElevator>): IElevatorRecord {
    return this._ElevatorRecord(state)
  }
}
