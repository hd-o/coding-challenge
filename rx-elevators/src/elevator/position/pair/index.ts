import { ElevatorId } from '/src/elevator/id'
import { RecordOf } from 'immutable'
import { ElevatorPosition } from '../'

type ElevatorPositionPairModel = {
  elevator: ElevatorId
  position: ElevatorPosition
}

export type ElevatorPositionPair = RecordOf<ElevatorPositionPairModel>
