import { mirror } from '/src/util/mirror'

export const elevatorQueueItemCategories = mirror({
  Door: '',
  Floor: '',
})

export type ElevatorQueueItemCategory = typeof elevatorQueueItemCategories
