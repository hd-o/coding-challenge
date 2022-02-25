import { useElevatorQueueItemIsOfFloor } from '/src/elevator/queue/floor/item/of/floor'
import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
import { ElevatorQueue } from '../..'

type ElevatorQueueContainsFloor = (queue: ElevatorQueue, floor: FloorNumber) => boolean

export const useElevatorQueueContainsFloor: FnCtor<ElevatorQueueContainsFloor> = (container) => {
  const itemIsOfFloor = container.resolve(useElevatorQueueItemIsOfFloor)

  const elevatorQueueContainsFloor: ElevatorQueueContainsFloor = (queue, floor) =>
    undefined !== queue.find(item => itemIsOfFloor(floor, item))

  return elevatorQueueContainsFloor
}
