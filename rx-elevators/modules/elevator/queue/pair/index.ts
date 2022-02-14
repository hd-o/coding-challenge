import { RecordOf } from 'immutable'
import { ElevatorQueue } from '../'
import { ElevatorId } from '../../id'

type ElevatorQueuePairModel = {
  elevator: ElevatorId
  queue: ElevatorQueue
}

export type ElevatorQueuePair = RecordOf<ElevatorQueuePairModel>
