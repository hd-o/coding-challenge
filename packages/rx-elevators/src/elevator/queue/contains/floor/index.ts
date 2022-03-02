import { useElevatorQueueItemIsOfFloor } from '/src/elevator/queue/floor/item/of/floor'
import { FloorNumber } from '/src/floor/number'
import { resolve, Use } from '/src/util/resolve'
import { ElevatorQueue } from '../..'

type ElevatorQueueContainsFloor = (queue: ElevatorQueue, floor: FloorNumber) => boolean

export const useElevatorQueueContainsFloor: Use<ElevatorQueueContainsFloor> = (container) => {
  const itemIsOfFloor = resolve(container)(useElevatorQueueItemIsOfFloor)

  const elevatorQueueContainsFloor: ElevatorQueueContainsFloor = (queue, floor) =>
    undefined !== queue.find(item => itemIsOfFloor(floor, item))

  return elevatorQueueContainsFloor
}
