import { List } from 'immutable'
import { IFloor } from '~/floor/model'
import { ElevatorMoveState } from './moveState'

type ElevatorId = string | {}

export interface IElevator {
  id: ElevatorId
  floors: List<IFloor>
  moveState: ElevatorMoveState
}
