import { ElevatorQueue } from '../..'
import { FloorNumber } from '../../../../floor/number'
import { FnCtor } from '../../../../function/container'
import { useElevatorQueueItemIsOfFloor } from '../../floor/item/of/floor'

type ElevatorQueueContainsFloor = (queue: ElevatorQueue, floor: FloorNumber) => boolean

export const useElevatorQueueContainsFloor: FnCtor<ElevatorQueueContainsFloor> = (container) => {
  const itemIsOfFloor = container.resolve(useElevatorQueueItemIsOfFloor)

  const elevatorQueueContainsFloor: ElevatorQueueContainsFloor = (queue, floor) =>
    undefined !== queue.find(item => itemIsOfFloor(floor, item))

  return elevatorQueueContainsFloor
}
