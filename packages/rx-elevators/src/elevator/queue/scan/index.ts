
import { resolve, Use } from '/src/util/resolve'
import { ElevatorQueue } from '../'
import { ElevatorQueueAction } from '../action'
import { useElevatorQueueDoorScan } from '../door/scan'
import { useElevatorQueueFloorScan } from '../floor/scan'
import { elevatorQueueItemCategories } from '../item/category'

const itemCategories = elevatorQueueItemCategories

type ElevatorQueueScan = (q: ElevatorQueue, a: ElevatorQueueAction) => ElevatorQueue

export const useElevatorQueueScan: Use<ElevatorQueueScan> = (container) => {
  const doorScan = resolve(container)(useElevatorQueueDoorScan)
  const floorScan = resolve(container)(useElevatorQueueFloorScan)

  const elevatorQueueScan: ElevatorQueueScan = (queue, action) => {
    if (action.category === itemCategories.Door) return doorScan(action, queue)
    if (action.category === itemCategories.Floor) return floorScan(action, queue)
    return queue
  }

  return elevatorQueueScan
}
