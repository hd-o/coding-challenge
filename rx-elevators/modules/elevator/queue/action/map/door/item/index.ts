import { FnCtor } from '../../../../../../function/container'
import { ElevatorId } from '../../../../../id'
import { ElevatorQueueDoorActionType } from '../../../../door/action/type'
import { ElevatorQueueDoorItem, useNewElevatorQueueDoorItem } from '../../../../door/item'

type ElevatorQueueActionMapDoorItem =
  (t: ElevatorQueueDoorActionType) => (e: ElevatorId) => ElevatorQueueDoorItem

export const useElevatorQueueActionMapDoorItem: FnCtor<ElevatorQueueActionMapDoorItem> = (container) => {
  const newDoorItem = container.resolve(useNewElevatorQueueDoorItem)

  const mapQueueDoorItem: ElevatorQueueActionMapDoorItem =
    (type) => (elevator) => newDoorItem(type, elevator)

  return mapQueueDoorItem
}
