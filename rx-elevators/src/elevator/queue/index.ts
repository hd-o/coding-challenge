import { OrderedSet } from 'immutable'
import { ElevatorQueueItem } from './item'

export type ElevatorQueue = OrderedSet<ElevatorQueueItem>
