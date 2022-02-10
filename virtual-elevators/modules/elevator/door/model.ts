import { RecordOf } from 'immutable'
import { IElevatorDoorPosition } from './model/position'
import { IElevatorDoorStatus } from './model/status'

export interface IElevatorDoor {
  status: IElevatorDoorStatus
  position: IElevatorDoorPosition
}

export type IElevatorDoorRecord = RecordOf<IElevatorDoor>
