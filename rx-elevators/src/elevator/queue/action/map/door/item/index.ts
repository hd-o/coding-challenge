import { ElevatorId } from '/src/elevator/id'
import { ElevatorQueueDoorActionType } from '/src/elevator/queue/door/action/type'
import { ElevatorQueueDoorItem, useNewElevatorQueueDoorItem } from '/src/elevator/queue/door/item'
import { FnCtor } from '/src/function/container'

type ElevatorQueueActionMapDoorItem =
  (t: ElevatorQueueDoorActionType) => (e: ElevatorId) => ElevatorQueueDoorItem

export const useElevatorQueueActionMapDoorItem: FnCtor<ElevatorQueueActionMapDoorItem> = (container) => {
  const newDoorItem = container.resolve(useNewElevatorQueueDoorItem)

  const mapQueueDoorItem: ElevatorQueueActionMapDoorItem =
    (type) => (elevator) => newDoorItem(type, elevator)

  return mapQueueDoorItem
}
