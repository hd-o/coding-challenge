import { ElevatorDoorPosition } from './model/position'
import { ElevatorDoorStatus } from './model/status'

export interface IElevatorDoor {
  status: ElevatorDoorStatus
  position: ElevatorDoorPosition
}
