import { mirror } from '../../../../util/mirror'

export const elevatorDoorMovementTypes = mirror({
  Closing: '',
  Closed: '',
  Open: '',
  Opening: '',
})

export type ElevatorDoorMovementTypes = keyof typeof elevatorDoorMovementTypes
