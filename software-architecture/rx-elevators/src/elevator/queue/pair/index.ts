import { ElevatorId } from '/src/elevator/id'
import { RecordOf } from 'immutable'
import { ElevatorQueue } from '../'

interface ElevatorQueuePairModel {
  elevator: ElevatorId
  queue: ElevatorQueue
}

export type ElevatorQueuePair = RecordOf<ElevatorQueuePairModel>
