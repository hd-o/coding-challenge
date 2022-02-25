import { RecordOf } from 'immutable'
import { IElevatorDoorPosition } from './model/position'
import { IElevatorDoorStatus } from './model/status'

export interface IElevatorDoor {
  position: IElevatorDoorPosition
  status: IElevatorDoorStatus
}

export type IElevatorDoorRecord = RecordOf<IElevatorDoor>
