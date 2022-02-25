import { ElevatorDoorActionId } from '/src/elevator/door/action/id'
import { ElevatorId } from '/src/elevator/id'
import {
  elevatorQueueItemCategories, ElevatorQueueItemCategory
} from '/src/elevator/queue/item/category'
import { FnCtor } from '/src/function/container'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { useLodashUniqueId } from '/src/pkg/lodash/uniqueId'
import { RecordOf } from 'immutable'
import { ElevatorQueueDoorActionType } from '../action/type'

export interface ElevatorQueueDoorItemModel {
  actionId: ElevatorDoorActionId
  category: ElevatorQueueItemCategory['Door']
  elevator: ElevatorId
  type: ElevatorQueueDoorActionType
}

export type ElevatorQueueDoorItem = RecordOf<ElevatorQueueDoorItemModel>

type NewElevatorQueueDoorItem = (t: ElevatorQueueDoorActionType, e: ElevatorId) => ElevatorQueueDoorItem

export const useNewElevatorQueueDoorItem: FnCtor<NewElevatorQueueDoorItem> = (container) => {
  const Record = container.resolve(useImmutableRecord)
  const uniqueId = container.resolve(useLodashUniqueId)

  const newElevatorQueueDoorItem: NewElevatorQueueDoorItem = (type, elevator) =>
    Record<ElevatorQueueDoorItemModel>({
      actionId: uniqueId(),
      category: elevatorQueueItemCategories.Door,
      type,
      elevator,
    })()

  return newElevatorQueueDoorItem
}
