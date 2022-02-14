import { RecordOf } from 'immutable'
import { ElevatorPosition } from '../'
import { ElevatorId } from '../../id'

type ElevatorPositionPairModel = {
  elevator: ElevatorId
  position: ElevatorPosition
}

export type ElevatorPositionPair = RecordOf<ElevatorPositionPairModel>
