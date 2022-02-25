import { useNewElevatorFloorPair } from '/src/elevator/floor/pair'
import { ElevatorId } from '/src/elevator/id'
import { ElevatorQueue } from '/src/elevator/queue'
import { useElevatorQueueDoorOpenEvent$ } from '/src/elevator/queue/door/open/event'
import { elevatorQueueItemCategories } from '/src/elevator/queue/item/category'
import { useElevatorQueueRemoveEvent$ } from '/src/elevator/queue/remove/event/stream'
import { floorHeight } from '/src/floor/height'
import { FnCtor } from '/src/function/container'
import { ElevatorPosition } from '../'

type ElevatorPositionScan =
  (e: ElevatorId) => (p: ElevatorPosition, q: ElevatorQueue) => ElevatorPosition

export const newElevatorPositionScan: FnCtor<ElevatorPositionScan> = (container) => {
  const elevatorQueueDoorOpenEvent$ = container.resolve(useElevatorQueueDoorOpenEvent$)
  const elevatorQueueRemoveEvent$ = container.resolve(useElevatorQueueRemoveEvent$)
  const newElevatorFloorPair = container.resolve(useNewElevatorFloorPair)

  const elevatorPositionScan: ElevatorPositionScan = (elevator) => (position, queue) => {
    const item = queue.first()
    if (item === undefined) return position
    if (item.category === elevatorQueueItemCategories.Floor) {
      const { floor } = item
      const nextPosition = floor * floorHeight
      if (position < nextPosition) return position + 1
      if (position > nextPosition) return position - 1
      // Else: elevator arrived at floor
      elevatorQueueRemoveEvent$.next(newElevatorFloorPair(elevator, floor))
      elevatorQueueDoorOpenEvent$.next(elevator)
    }
    return position
  }

  return elevatorPositionScan
}