import { FnCtor } from '../../../../../../function/container'
import { ElevatorFloorPair } from '../../../../../floor/pair'
import { ElevatorQueueFloorAction, useNewElevatorQueueFloorAction } from '../../../../floor/action'
import { ElevatorQueueFloorActionType } from '../../../../floor/action/type'

type ElevatorQueueMapFloorAction =
  (t: ElevatorQueueFloorActionType) => (p: ElevatorFloorPair) => ElevatorQueueFloorAction

export const useElevatorQueueMapFloorAction: FnCtor<ElevatorQueueMapFloorAction> = (container) => {
  const newFloorAction = container.resolve(useNewElevatorQueueFloorAction)

  const elevatorQueueMapFloorAction: ElevatorQueueMapFloorAction =
    (type) => (pair) => newFloorAction(type, pair)

  return elevatorQueueMapFloorAction
}
