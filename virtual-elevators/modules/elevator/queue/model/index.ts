import { IFloor } from '~/floor/model'
import { SortedSet } from '~/pkg/immutable/SortedSet'
import { IElevatorQueueState } from './moveState'

// TODO: IFloor -> FloorRecord
export type IElevatorQueueSet = SortedSet<IFloor>

export interface IElevatorQueue {
  state: IElevatorQueueState
  MovingUp: IElevatorQueueSet
  MovingDown: IElevatorQueueSet
}
