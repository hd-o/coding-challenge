
import { ElevatorQueueItem } from '/src/elevator/queue/item'
import { FloorNumber } from '/src/floor/number'
import { resolve, Use } from '/src/util/resolve'
import { useElevatorQueueItemOfCategoryFloor } from '../category/floor'

type ElevatorQueueItemIsOfFloor = (floor: FloorNumber, item: ElevatorQueueItem) => boolean

export const useElevatorQueueItemIsOfFloor: Use<ElevatorQueueItemIsOfFloor> = (container) => {
  const isCategoryFloor = resolve(container)(useElevatorQueueItemOfCategoryFloor)

  const queueItemIsOfFloor: ElevatorQueueItemIsOfFloor = (floor, item) =>
    isCategoryFloor(item) && item.floor === floor

  return queueItemIsOfFloor
}
