export type IElevatorDirectionType = 'MovingUp' | 'MovingDown'

type IElevatorDirectionTypeMap = Record<IElevatorDirectionType, IElevatorDirectionType>

export const elevatorDirectionType: IElevatorDirectionTypeMap = {
  MovingUp: 'MovingUp',
  MovingDown: 'MovingDown',
}
