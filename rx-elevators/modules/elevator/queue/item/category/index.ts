import { mirror } from '../../../../util/mirror'

export const elevatorQueueItemCategories = mirror({
  Door: '',
  Floor: '',
})

export type ElevatorQueueItemCategory = typeof elevatorQueueItemCategories
