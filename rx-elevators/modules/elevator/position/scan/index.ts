import { ElevatorPosition } from '../'
import { floorHeight } from '../../../floor/height'
import { FnCtor } from '../../../function/container'
import { useNewElevatorFloorPair } from '../../floor/pair'
import { ElevatorId } from '../../id'
import { ElevatorQueue } from '../../queue'
import { useElevatorQueueDoorOpenEvent$ } from '../../queue/door/open/event'
import { elevatorQueueItemCategories } from '../../queue/item/category'
import { useElevatorQueueRemoveEvent$ } from '../../queue/remove/event/stream'

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
