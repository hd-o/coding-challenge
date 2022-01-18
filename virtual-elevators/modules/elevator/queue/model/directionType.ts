export type ElevatorDirectionType = 'MovingUp' | 'MovingDown'

type ElevatorDirectionTypeMap = Record<ElevatorDirectionType, ElevatorDirectionType>

export const elevatorDirectionType: ElevatorDirectionTypeMap = {
  MovingUp: 'MovingUp',
  MovingDown: 'MovingDown'
}
