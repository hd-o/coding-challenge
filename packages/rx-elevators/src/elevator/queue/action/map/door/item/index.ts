import { ElevatorId } from '/src/elevator/id'
import { ElevatorQueueDoorActionType } from '/src/elevator/queue/door/action/type'
import { ElevatorQueueDoorItem, useNewElevatorQueueDoorItem } from '/src/elevator/queue/door/item'
import { resolve, Use } from '/src/util/resolve'

type ElevatorQueueActionMapDoorItem =
  (t: ElevatorQueueDoorActionType) => (e: ElevatorId) => ElevatorQueueDoorItem

export const useElevatorQueueActionMapDoorItem: Use<ElevatorQueueActionMapDoorItem> = (container) => {
  const newDoorItem = resolve(container)(useNewElevatorQueueDoorItem)

  const mapQueueDoorItem: ElevatorQueueActionMapDoorItem =
    (type) => (elevator) => newDoorItem(type, elevator)

  return mapQueueDoorItem
}
