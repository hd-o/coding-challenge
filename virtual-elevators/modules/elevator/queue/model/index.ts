import { IFloor } from '~/floor/model'
import { SortedSet } from '~/pkg/immutable/SortedSet'
import { ElevatorQueueState } from './moveState'

// TODO: IFloor -> FloorRecord
export type ElevatorQueueSet = SortedSet<IFloor>

export interface IElevatorQueue {
  state: ElevatorQueueState
  MovingUp: ElevatorQueueSet
  MovingDown: ElevatorQueueSet
}
