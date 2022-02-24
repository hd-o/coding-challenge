import { ElevatorId } from '/src/elevator/id'
import { RecordOf } from 'immutable'
import { ElevatorPosition } from '../'

interface ElevatorPositionPairModel {
  elevator: ElevatorId
  position: ElevatorPosition
}

export type ElevatorPositionPair = RecordOf<ElevatorPositionPairModel>
