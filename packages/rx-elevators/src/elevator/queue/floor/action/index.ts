import { ElevatorId } from '/src/elevator/id'
import { ElevatorFloorPair } from '/src/floor/pair'
import { FnCtor } from '/src/function/container'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { RecordOf } from 'immutable'
import { ElevatorQueueFloorItemModel, useNewElevatorQueueFloorItem } from '../item'
import { ElevatorQueueFloorActionType } from './type'

export type ElevatorQueueFloorActionModel = ElevatorQueueFloorItemModel & {
  elevator: ElevatorId
  type: ElevatorQueueFloorActionType
}

export type ElevatorQueueFloorAction = RecordOf<ElevatorQueueFloorActionModel>

type NewElevatorQueueFloorAction =
  (t: ElevatorQueueFloorActionType, p: ElevatorFloorPair) => ElevatorQueueFloorAction

export const useNewElevatorQueueFloorAction: FnCtor<NewElevatorQueueFloorAction> = (container) => {
  const newQueueFloorItem = container.resolve(useNewElevatorQueueFloorItem)
  const Record = container.resolve(useImmutableRecord)

  const newElevatorQueueFloorAction: NewElevatorQueueFloorAction = (type, pair) => Record({
    ...newQueueFloorItem(pair.floor).toObject(),
    elevator: pair.elevator,
    type,
  })()

  return newElevatorQueueFloorAction
}
