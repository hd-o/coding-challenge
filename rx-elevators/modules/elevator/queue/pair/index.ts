import { RecordOf } from 'immutable'
import { ElevatorQueue } from '../'
import { ElevatorId } from '../../id'

interface ElevatorQueuePairModel {
  elevator: ElevatorId
  queue: ElevatorQueue
}

export type ElevatorQueuePair = RecordOf<ElevatorQueuePairModel>
