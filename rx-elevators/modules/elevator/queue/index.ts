import { OrderedSet } from 'immutable'
import { ElevatorQueueDoorItem } from './door/item'
import { ElevatorQueueFloorItem } from './floor/item'

export type ElevatorQueueItem =
  | ElevatorQueueDoorItem
  | ElevatorQueueFloorItem

export type ElevatorQueue = OrderedSet<ElevatorQueueItem>
