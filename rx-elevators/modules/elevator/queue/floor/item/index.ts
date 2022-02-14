import { RecordOf } from 'immutable'
import { FloorNumber } from '../../../../floor/number'
import { FnCtor } from '../../../../function/container'
import { useImmutableRecord } from '../../../../pkg/immutable/Record'
import { elevatorQueueItemCategories, ElevatorQueueItemCategory } from '../../item/category'

const itemCategories = elevatorQueueItemCategories

export interface ElevatorQueueFloorItemModel {
  category: ElevatorQueueItemCategory['Floor']
  floor: FloorNumber
}

export type ElevatorQueueFloorItem = RecordOf<ElevatorQueueFloorItemModel>

type NewElevatorQueueFloorItem = (f: FloorNumber) => ElevatorQueueFloorItem

export const useNewElevatorQueueFloorItem: FnCtor<NewElevatorQueueFloorItem> = (container) => {
  const Record = container.resolve(useImmutableRecord)

  const newQueueFloorItem: NewElevatorQueueFloorItem = (floor) => Record({
    category: itemCategories.Floor,
    floor,
  })()

  return newQueueFloorItem
}
