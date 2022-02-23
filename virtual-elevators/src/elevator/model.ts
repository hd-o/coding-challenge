import { IFloor } from '/src/floor/model'
import { List, RecordOf } from 'immutable'
import { ElevatorMoveState } from './moveState'

export interface IElevator {
  id: string
  floors: List<IFloor>
  moveState: ElevatorMoveState
}

export type IElevatorRecord = RecordOf<IElevator>
