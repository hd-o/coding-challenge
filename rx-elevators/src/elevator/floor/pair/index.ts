import { ElevatorId } from '/src/elevator/id'
import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { RecordOf } from 'immutable'

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
