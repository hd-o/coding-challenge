import { ElevatorQueueDoorItem } from '../door/item'
import { ElevatorQueueFloorAction } from '../floor/action'

export type ElevatorQueueAction =
  | ElevatorQueueFloorAction
  | ElevatorQueueDoorItem
