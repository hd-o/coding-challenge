import {
  elevatorQueueItemCategories, ElevatorQueueItemCategory
} from '/src/elevator/queue/item/category'
import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { RecordOf } from 'immutable'

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
