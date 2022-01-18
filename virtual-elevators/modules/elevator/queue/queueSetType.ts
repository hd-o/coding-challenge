export type ElevatorQueueSetType = 'MovingUp' | 'MovingDown'

type ElevatorQueueSetTypeMap = Record<ElevatorQueueSetType, ElevatorQueueSetType>

export const elevatorQueueSetType: ElevatorQueueSetTypeMap = {
  MovingUp: 'MovingUp',
  MovingDown: 'MovingDown'
}
