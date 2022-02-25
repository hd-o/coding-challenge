import { FloorList$ } from '/src/floor/stream'
import { Immutable } from '/src/pkg/immutable'
import { inject, singleton } from 'tsyringe'
import { IElevator, IElevatorRecord } from './model'
import { ElevatorMoveState } from './moveState'

@singleton()
export class ElevatorFactory {
  constructor (
    @inject(Immutable) private readonly _immutable: Immutable,
    @inject(FloorList$) private readonly _floors$: FloorList$
  ) {}

  private readonly _ElevatorRecord = this._immutable.Record<IElevator>({
    floors: this._floors$.value,
    id: '',
    moveState: ElevatorMoveState.Idle,
  })

  create (state?: Partial<IElevator>): IElevatorRecord {
    return this._ElevatorRecord(state)
  }
}
