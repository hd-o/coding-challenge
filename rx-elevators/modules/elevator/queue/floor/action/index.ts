import { RecordOf } from 'immutable'
import { FnCtor } from '../../../../function/container'
import { useImmutableRecord } from '../../../../pkg/immutable/Record'
import { ElevatorFloorPair } from '../../../floor/pair'
import { ElevatorId } from '../../../id'
import { ElevatorQueueFloorItemModel, useNewElevatorQueueFloorItem } from '../item'
import { ElevatorQueueFloorActionType } from './type'

export type ElevatorQueueFloorActionModel = ElevatorQueueFloorItemModel & {
  type: ElevatorQueueFloorActionType
  elevator: ElevatorId
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
