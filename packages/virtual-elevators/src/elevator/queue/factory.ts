import { IFloorRecord } from '/src/floor/model'
import { Immutable } from '/src/pkg/immutable'
import { IComparator } from '/src/pkg/immutable/SortedSet'
import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { IElevatorQueue } from './model'
import { elevatorQueueState } from './model/moveState'

const floorComparator: IComparator<IFloorRecord> = (a, b) => {
  if (a.number === b.number) return 0
  if (a.number < b.number) return -1
  return 1
}

@singleton()
export class ElevatorQueueFactory {
  constructor (
    @inject(Immutable) private readonly _immutable: Immutable
  ) {}

  private readonly _ElevatorQueueRecord = this._immutable.Record<IElevatorQueue>({
    MovingDown: new this._immutable.SortedSet<IFloorRecord>([], (a, b) => floorComparator(b, a)),
    MovingUp: new this._immutable.SortedSet<IFloorRecord>([], floorComparator),
    state: elevatorQueueState.Idle,
  })

  create (queue?: Partial<IElevatorQueue>): RecordOf<IElevatorQueue> {
    return this._ElevatorQueueRecord(queue)
  }
}
