import { RecordOf } from 'immutable'
import { FloorNumber } from '../../../floor/number'
import { FnCtor } from '../../../function/container'
import { useImmutableRecord } from '../../../pkg/immutable/Record'
import { ElevatorId } from '../../id'

type ElevatorFloorPairModel = {
  elevator: ElevatorId
  floor: FloorNumber
}

export type ElevatorFloorPair = RecordOf<ElevatorFloorPairModel>

type NewElevatorFloorPair = (e: ElevatorId, f: FloorNumber) => ElevatorFloorPair

export const useNewElevatorFloorPair: FnCtor<NewElevatorFloorPair> = (container) => {
  const Record = container.resolve(useImmutableRecord)

  const newElevatorFloorPair: NewElevatorFloorPair =
    (elevator, floor) => Record({ elevator, floor })()

  return newElevatorFloorPair
}
