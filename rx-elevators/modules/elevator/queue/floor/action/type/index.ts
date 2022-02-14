import { mirror } from '../../../../../util/mirror'

export const elevatorQueueFloorActionTypes = mirror({
  Add: '',
  Remove: '',
})

export type ElevatorQueueFloorActionType = keyof typeof elevatorQueueFloorActionTypes
