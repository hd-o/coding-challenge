import { mirror } from '/src/util/mirror'

export const elevatorQueueDoorActionTypes = mirror({
  Closed: '',
  Open: '',
})

export type ElevatorQueueDoorActionType = keyof typeof elevatorQueueDoorActionTypes
