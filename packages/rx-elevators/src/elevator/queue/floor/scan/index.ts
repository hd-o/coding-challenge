
import { useElevatorQueueContainsFloor } from '/src/elevator/queue/contains/floor'
import { elevatorQueueFloorActionTypes } from '/src/elevator/queue/floor/action/type'
import { useNewElevatorQueueFloorItem } from '/src/elevator/queue/floor/item'
import { useElevatorQueueItemIsOfFloor } from '/src/elevator/queue/floor/item/of/floor'
import { resolve, Use } from '/src/util/resolve'
import { ElevatorQueue } from '../..'
import { ElevatorQueueFloorAction } from '../action'

const actionTypes = elevatorQueueFloorActionTypes

type ElevatorQueueFloorScan = (a: ElevatorQueueFloorAction, q: ElevatorQueue) => ElevatorQueue

export const useElevatorQueueFloorScan: Use<ElevatorQueueFloorScan> = (container) => {
  const newFloorItem = resolve(container)(useNewElevatorQueueFloorItem)
  const queueContainsFloor = resolve(container)(useElevatorQueueContainsFloor)
  const queueItemIsOfFloor = resolve(container)(useElevatorQueueItemIsOfFloor)

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
