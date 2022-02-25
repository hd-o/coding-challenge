/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { elevatorDirectionType, IElevatorDirectionType } from './directionType'

export type IElevatorQueueState = IElevatorDirectionType | 'Idle'

type IElevatorQueueStateMap = Record<IElevatorQueueState, IElevatorQueueState>

/** @see IElevatorQueue.state */
export const elevatorQueueState: IElevatorQueueStateMap = {
  ...elevatorDirectionType,
  Idle: 'Idle',
}
