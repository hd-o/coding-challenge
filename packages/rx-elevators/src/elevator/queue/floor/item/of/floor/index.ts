import { ElevatorQueueItem } from '/src/elevator/queue/item'
import { FloorNumber } from '/src/floor/number'
import { Use } from '/src/util/resolve'
import { useElevatorQueueItemOfCategoryFloor } from '../category/floor'

type ElevatorQueueItemIsOfFloor = (floor: FloorNumber, item: ElevatorQueueItem) => boolean

export const useElevatorQueueItemIsOfFloor: Use<ElevatorQueueItemIsOfFloor> = (resolve) => {
  const isCategoryFloor = resolve(useElevatorQueueItemOfCategoryFloor)

  const queueItemIsOfFloor: ElevatorQueueItemIsOfFloor = (floor, item) =>
    isCategoryFloor(item) && item.floor === floor

  return queueItemIsOfFloor
}
