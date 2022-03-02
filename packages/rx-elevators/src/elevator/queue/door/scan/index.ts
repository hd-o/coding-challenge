import { ElevatorQueue } from '/src/elevator/queue'
import { elevatorQueueItemCategories } from '/src/elevator/queue/item/category'
import { useImmutableOrderedSet } from '/src/pkg/immutable/OrderedSet'
import { resolve, Use } from '/src/util/resolve'
import { elevatorQueueDoorActionTypes } from '../action/type'
import { ElevatorQueueDoorItem } from '../item'

const actionTypes = elevatorQueueDoorActionTypes
const categories = elevatorQueueItemCategories

type ElevatorQueueDoorScan = (i: ElevatorQueueDoorItem, q: ElevatorQueue) => ElevatorQueue

export const useElevatorQueueDoorScan: Use<ElevatorQueueDoorScan> = (container) => {
  const OrderedSet = resolve(container)(useImmutableOrderedSet)

  const elevatorQueueScanCategoryDoor: ElevatorQueueDoorScan = (item, queue) => {
    if (item.type === actionTypes.Open) {
      // Replace first queued item if it's a QueueDoorItem
      const sliceCount = queue.first()?.category === categories.Door ? 1 : 0
      return OrderedSet([item]).concat(queue.slice(sliceCount))
    }
    if (item.type === actionTypes.Closed) {
      // Door has closed, remove door item from queue
      return queue.slice(1)
    }
    return queue
  }

  return elevatorQueueScanCategoryDoor
}
