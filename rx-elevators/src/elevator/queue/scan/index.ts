import { FnCtor } from '/src/function/container'
import { ElevatorQueue } from '../'
import { ElevatorQueueAction } from '../action'
import { useElevatorQueueDoorScan } from '../door/scan'
import { useElevatorQueueFloorScan } from '../floor/scan'
import { elevatorQueueItemCategories } from '../item/category'

const itemCategories = elevatorQueueItemCategories

type ElevatorQueueScan = (q: ElevatorQueue, a: ElevatorQueueAction) => ElevatorQueue

export const useElevatorQueueScan: FnCtor<ElevatorQueueScan> = (container) => {
  const doorScan = container.resolve(useElevatorQueueDoorScan)
  const floorScan = container.resolve(useElevatorQueueFloorScan)

  const elevatorQueueScan: ElevatorQueueScan = (queue, action) => {
    if (action.category === itemCategories.Door) return doorScan(action, queue)
    if (action.category === itemCategories.Floor) return floorScan(action, queue)
    return queue
  }

  return elevatorQueueScan
}
