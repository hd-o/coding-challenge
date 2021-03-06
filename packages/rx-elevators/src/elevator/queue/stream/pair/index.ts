import { ElevatorId } from '/src/elevator/id'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { Use } from '/src/util/resolve'
import { RecordOf } from 'immutable'
import { ElevatorQueue$ } from '../'

interface ElevatorQueue$PairModel {
  elevator: ElevatorId
  queue$: ElevatorQueue$
}

export type ElevatorQueue$Pair = RecordOf<ElevatorQueue$PairModel>

type NewElevatorQueue$Pair = (e: ElevatorId, q$: ElevatorQueue$) => ElevatorQueue$Pair

export const useNewElevatorQueue$Pair: Use<NewElevatorQueue$Pair> = (resolve) => {
  const Record = resolve(useImmutableRecord)

  const newElevatorQueue$Pair: NewElevatorQueue$Pair =
    (elevator, queue$) => Record({ elevator, queue$ })()

  return newElevatorQueue$Pair
}
