import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import {
  ElevatorQueueFloorAction, useNewElevatorQueueFloorAction
} from '/src/elevator/queue/floor/action'
import { ElevatorQueueFloorActionType } from '/src/elevator/queue/floor/action/type'
import { FnCtor } from '/src/function/container'

type ElevatorQueueMapFloorAction =
  (t: ElevatorQueueFloorActionType) => (p: ElevatorFloorPair) => ElevatorQueueFloorAction

export const useElevatorQueueMapFloorAction: FnCtor<ElevatorQueueMapFloorAction> = (container) => {
  const newFloorAction = container.resolve(useNewElevatorQueueFloorAction)

  const elevatorQueueMapFloorAction: ElevatorQueueMapFloorAction =
    (type) => (pair) => newFloorAction(type, pair)

  return elevatorQueueMapFloorAction
}
