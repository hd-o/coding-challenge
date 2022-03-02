import { useElevatorQueueContainsFloor } from '/src/elevator/queue/contains/floor'
import { elevatorQueueFloorActionTypes } from '/src/elevator/queue/floor/action/type'
import { useNewElevatorQueueFloorItem } from '/src/elevator/queue/floor/item'
import { useElevatorQueueItemIsOfFloor } from '/src/elevator/queue/floor/item/of/floor'
import { Use } from '/src/util/resolve'
import { ElevatorQueue } from '../..'
import { ElevatorQueueFloorAction } from '../action'

const actionTypes = elevatorQueueFloorActionTypes

type ElevatorQueueFloorScan = (a: ElevatorQueueFloorAction, q: ElevatorQueue) => ElevatorQueue

export const useElevatorQueueFloorScan: Use<ElevatorQueueFloorScan> = (resolve) => {
  const newFloorItem = resolve(useNewElevatorQueueFloorItem)
  const queueContainsFloor = resolve(useElevatorQueueContainsFloor)
  const queueItemIsOfFloor = resolve(useElevatorQueueItemIsOfFloor)

  const elevatorQueueFloorScan: ElevatorQueueFloorScan = (action, queue) => {
    const floorInQueue = queueContainsFloor(queue, action.floor)
    if (action.type === actionTypes.Add && !floorInQueue) {
      return queue.add(newFloorItem(action.floor))
    }
    if (action.type === actionTypes.Remove && floorInQueue) {
      return queue.filter(item => !queueItemIsOfFloor(action.floor, item))
    }
    return queue
  }

  return elevatorQueueFloorScan
}
