import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { IFloor } from '~/floor/model'
import { Immutable } from '~/pkg/immutable'
import { ComparatorResult } from '~/pkg/immutable/SortedSet'
import { IElevatorQueue } from './model'
import { elevatorQueueState } from './model/moveState'

function floorComparator (a: IFloor, b: IFloor): ComparatorResult {
  if (a.number === b.number) return 0
  if (a.number < b.number) return -1
  return 1
}

@singleton()
export class ElevatorQueueFactory {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    private readonly _ElevatorQueueRecord = immutable.Record<IElevatorQueue>({
      state: elevatorQueueState.Idle,
      MovingDown: new immutable.SortedSet<IFloor>([], (a, b) => floorComparator(b, a)),
      MovingUp: new immutable.SortedSet([], floorComparator)
    })
  ) {}

  create (queue?: Partial<IElevatorQueue>): RecordOf<IElevatorQueue> {
    return this._ElevatorQueueRecord(queue)
  }
}
