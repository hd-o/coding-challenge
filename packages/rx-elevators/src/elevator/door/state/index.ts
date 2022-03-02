import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { Use } from '/src/util/resolve'
import { RecordOf } from 'immutable'
import { ElevatorDoorActionId } from '../action/id'
import { elevatorDoorMovementTypes, ElevatorDoorMovementTypes } from '../movement/types'
import { ElevatorDoorPosition, elevatorDoorPositions } from '../position'

export interface ElevatorDoorStateModel {
  currentActionId: ElevatorDoorActionId | null
  movementState: ElevatorDoorMovementTypes
  position: ElevatorDoorPosition
  waitCount: number
}

export type ElevatorDoorState = RecordOf<ElevatorDoorStateModel>

type NewDoorState = () => ElevatorDoorState

export const useNewElevatorDoorState: Use<NewDoorState> = (resolve) => {
  const Record = resolve(useImmutableRecord)

  const newDoorState: NewDoorState = () => Record<ElevatorDoorStateModel>({
    currentActionId: null,
    movementState: elevatorDoorMovementTypes.Closed,
    position: elevatorDoorPositions.closed,
    waitCount: 0,
  })()

  return newDoorState
}
