import { IFloorRecord } from '/src/floor/model'
import { SortedSet } from '/src/pkg/immutable/SortedSet'
import { IElevatorQueueState } from './moveState'

export type IElevatorQueueSet = SortedSet<IFloorRecord>

export interface IElevatorQueue {
  state: IElevatorQueueState
  MovingUp: IElevatorQueueSet
  MovingDown: IElevatorQueueSet
}
