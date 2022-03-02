import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import {
  ElevatorQueueFloorAction, useNewElevatorQueueFloorAction
} from '/src/elevator/queue/floor/action'
import { ElevatorQueueFloorActionType } from '/src/elevator/queue/floor/action/type'
import { Use } from '/src/util/resolve'

type ElevatorQueueMapFloorAction =
  (t: ElevatorQueueFloorActionType) => (p: ElevatorFloorPair) => ElevatorQueueFloorAction

export const useElevatorQueueMapFloorAction: Use<ElevatorQueueMapFloorAction> = (resolve) => {
  const newFloorAction = resolve(useNewElevatorQueueFloorAction)

  const elevatorQueueMapFloorAction: ElevatorQueueMapFloorAction =
    (type) => (pair) => newFloorAction(type, pair)

  return elevatorQueueMapFloorAction
}
