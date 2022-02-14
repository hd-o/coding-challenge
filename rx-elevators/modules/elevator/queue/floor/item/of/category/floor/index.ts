import { ElevatorQueueFloorItem } from '../../..'
import { ElevatorQueueItem } from '../../../../..'
import { elevatorQueueItemCategories } from '../../../../../item/category'

type ElevatorQueueItemOfCategoryFloor = (item: ElevatorQueueItem) => item is ElevatorQueueFloorItem

export const useElevatorQueueItemOfCategoryFloor = (): ElevatorQueueItemOfCategoryFloor => {
  const queueItemIsCategoryFloor: ElevatorQueueItemOfCategoryFloor =
    (item): item is ElevatorQueueFloorItem => item.category === elevatorQueueItemCategories.Floor

  return queueItemIsCategoryFloor
}
