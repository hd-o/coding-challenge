import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { ElevatorId } from '/src/elevator/id'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { Use } from '/src/util/resolve'
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

export const useNewElevatorQueueFloorAction: Use<NewElevatorQueueFloorAction> = (resolve) => {
  const newQueueFloorItem = resolve(useNewElevatorQueueFloorItem)
  const Record = resolve(useImmutableRecord)

  const newElevatorQueueFloorAction: NewElevatorQueueFloorAction = (type, pair) => Record({
    ...newQueueFloorItem(pair.floor).toObject(),
    elevator: pair.elevator,
    type,
  })()

  return newElevatorQueueFloorAction
}
