import { IFloorRecord } from '~/floor/model'
import { SortedSet } from '~/pkg/immutable/SortedSet'
import { IElevatorQueueState } from './moveState'

export type IElevatorQueueSet = SortedSet<IFloorRecord>

export interface IElevatorQueue {
  state: IElevatorQueueState
  MovingUp: IElevatorQueueSet
  MovingDown: IElevatorQueueSet
}
