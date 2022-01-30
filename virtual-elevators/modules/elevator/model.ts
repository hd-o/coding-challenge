import { List, RecordOf } from 'immutable'
import { IFloor } from '~/floor/model'
import { ElevatorMoveState } from './moveState'

export interface IElevator {
  id: string
  floors: List<IFloor>
  moveState: ElevatorMoveState
}

export type ElevatorRecord = RecordOf<IElevator>
