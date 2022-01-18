/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import type { IElevatorQueue } from '.'
import { ElevatorDirectionType, elevatorDirectionType } from './directionType'

export type ElevatorQueueState = ElevatorDirectionType | 'Idle'

type ElevatorQueueStateMap = Record<ElevatorQueueState, ElevatorQueueState>

/** @see IElevatorQueue.state */
export const elevatorQueueState: ElevatorQueueStateMap = {
  ...elevatorDirectionType,
  Idle: 'Idle'
}
