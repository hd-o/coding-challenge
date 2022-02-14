import { ElevatorQueue } from '../..'
import { FnCtor } from '../../../../function/container'
import { useElevatorQueueContainsFloor } from '../../contains/floor'
import { ElevatorQueueFloorAction } from '../action'
import { elevatorQueueFloorActionTypes } from '../action/type'
import { useNewElevatorQueueFloorItem } from '../item'
import { useElevatorQueueItemIsOfFloor } from '../item/of/floor'

const actionTypes = elevatorQueueFloorActionTypes

type ElevatorQueueFloorScan = (a: ElevatorQueueFloorAction, q: ElevatorQueue) => ElevatorQueue

export const useElevatorQueueFloorScan: FnCtor<ElevatorQueueFloorScan> = (container) => {
  const newFloorItem = container.resolve(useNewElevatorQueueFloorItem)
  const queueContainsFloor = container.resolve(useElevatorQueueContainsFloor)
  const queueItemIsOfFloor = container.resolve(useElevatorQueueItemIsOfFloor)

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
