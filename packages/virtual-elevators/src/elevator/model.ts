import { IFloor } from '/src/floor/model'
import { List, RecordOf } from 'immutable'
import { ElevatorMoveState } from './moveState'

export interface IElevator {
  floors: List<IFloor>
  id: string
  moveState: ElevatorMoveState
}

export type IElevatorRecord = RecordOf<IElevator>
