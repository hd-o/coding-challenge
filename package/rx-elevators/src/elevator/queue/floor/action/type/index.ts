import { mirror } from '/src/util/mirror'

export const elevatorQueueFloorActionTypes = mirror({
  Add: '',
  Remove: '',
})

export type ElevatorQueueFloorActionType = keyof typeof elevatorQueueFloorActionTypes
