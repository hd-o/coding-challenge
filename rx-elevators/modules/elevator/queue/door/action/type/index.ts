import { mirror } from '../../../../../util/mirror'

export const elevatorQueueDoorActionTypes = mirror({
  Closed: '',
  Open: '',
})

export type ElevatorQueueDoorActionType = keyof typeof elevatorQueueDoorActionTypes
