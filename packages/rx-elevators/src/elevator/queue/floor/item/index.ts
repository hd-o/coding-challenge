
import {
  elevatorQueueItemCategories, ElevatorQueueItemCategory
} from '/src/elevator/queue/item/category'
import { FloorNumber } from '/src/floor/number'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { resolve, Use } from '/src/util/resolve'
import { RecordOf } from 'immutable'

const itemCategories = elevatorQueueItemCategories

export interface ElevatorQueueFloorItemModel {
  category: ElevatorQueueItemCategory['Floor']
  floor: FloorNumber
}

export type ElevatorQueueFloorItem = RecordOf<ElevatorQueueFloorItemModel>

type NewElevatorQueueFloorItem = (f: FloorNumber) => ElevatorQueueFloorItem

export const useNewElevatorQueueFloorItem: Use<NewElevatorQueueFloorItem> = (container) => {
  const Record = resolve(container)(useImmutableRecord)

  const newQueueFloorItem: NewElevatorQueueFloorItem = (floor) => Record({
    category: itemCategories.Floor,
    floor,
  })()

  return newQueueFloorItem
}
