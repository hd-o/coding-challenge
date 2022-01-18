/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import type { IElevatorQueue } from './model'
import { elevatorQueueSetType, ElevatorQueueSetType } from './queueSetType'

export type ElevatorQueueState = ElevatorQueueSetType | 'Idle'

type ElevatorQueueStateMap = Record<ElevatorQueueState, ElevatorQueueState>

/** @see IElevatorQueue.state */
export const elevatorQueueState: ElevatorQueueStateMap = {
  ...elevatorQueueSetType,
  Idle: 'Idle'
}
