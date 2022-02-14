import { ElevatorQueueItem } from '../../../..'
import { FloorNumber } from '../../../../../../floor/number'
import { FnCtor } from '../../../../../../function/container'
import { useElevatorQueueItemOfCategoryFloor } from '../category/floor'

type ElevatorQueueItemIsOfFloor = (floor: FloorNumber, item: ElevatorQueueItem) => boolean

export const useElevatorQueueItemIsOfFloor: FnCtor<ElevatorQueueItemIsOfFloor> = (container) => {
  const isCategoryFloor = container.resolve(useElevatorQueueItemOfCategoryFloor)

  const queueItemIsOfFloor: ElevatorQueueItemIsOfFloor = (floor, item) =>
    isCategoryFloor(item) && item.floor === floor

  return queueItemIsOfFloor
}
