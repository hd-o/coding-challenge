import { ElevatorQueueFloorItem } from '/src/elevator/queue/floor/item'
import { ElevatorQueueItem } from '/src/elevator/queue/item'
import { elevatorQueueItemCategories } from '/src/elevator/queue/item/category'

type ElevatorQueueItemOfCategoryFloor = (item: ElevatorQueueItem) => item is ElevatorQueueFloorItem

export const useElevatorQueueItemOfCategoryFloor = (): ElevatorQueueItemOfCategoryFloor => {
  const queueItemIsCategoryFloor: ElevatorQueueItemOfCategoryFloor =
    (item): item is ElevatorQueueFloorItem => item.category === elevatorQueueItemCategories.Floor
  return queueItemIsCategoryFloor
}
