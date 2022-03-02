import { ElevatorId } from '/src/elevator/id'
import { FloorNumber } from '/src/floor/number'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { resolve, Use } from '/src/util/resolve'
import { RecordOf } from 'immutable'

interface ElevatorFloorPairModel {
  elevator: ElevatorId
  floor: FloorNumber
}

export type ElevatorFloorPair = RecordOf<ElevatorFloorPairModel>

type NewElevatorFloorPair = (e: ElevatorId, f: FloorNumber) => ElevatorFloorPair

export const useNewElevatorFloorPair: Use<NewElevatorFloorPair> = (container) => {
  const Record = resolve(container)(useImmutableRecord)

  const newElevatorFloorPair: NewElevatorFloorPair =
    (elevator, floor) => Record({ elevator, floor })()

  return newElevatorFloorPair
}
