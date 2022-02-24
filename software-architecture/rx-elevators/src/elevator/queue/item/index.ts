import { ElevatorQueueDoorItem } from '/src/elevator/queue/door/item'
import { ElevatorQueueFloorItem } from '/src/elevator/queue/floor/item'

export type ElevatorQueueItem =
  | ElevatorQueueDoorItem
  | ElevatorQueueFloorItem
