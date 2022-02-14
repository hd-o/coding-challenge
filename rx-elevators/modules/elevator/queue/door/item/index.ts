import { RecordOf } from 'immutable'
import { FnCtor } from '../../../../function/container'
import { useImmutableRecord } from '../../../../pkg/immutable/Record'
import { useLodashUniqueId } from '../../../../pkg/lodash/uniqueId'
import { ElevatorDoorActionId } from '../../../door/action/id'
import { ElevatorId } from '../../../id'
import { elevatorQueueItemCategories, ElevatorQueueItemCategory } from '../../item/category'
import { ElevatorQueueDoorActionType } from '../action/type'

export type ElevatorQueueDoorItemModel = {
  actionId: ElevatorDoorActionId
  category: ElevatorQueueItemCategory['Door']
  type: ElevatorQueueDoorActionType
  elevator: ElevatorId
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
