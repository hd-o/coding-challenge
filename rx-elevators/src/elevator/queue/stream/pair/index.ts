import { ElevatorId } from '/src/elevator/id'
import { FnCtor } from '/src/function/container'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { RecordOf } from 'immutable'
import { ElevatorQueue$ } from '../'

interface ElevatorQueue$PairModel {
  elevator: ElevatorId
  queue$: ElevatorQueue$
}

export type ElevatorQueue$Pair = RecordOf<ElevatorQueue$PairModel>

type NewElevatorQueue$Pair = (e: ElevatorId, q$: ElevatorQueue$) => ElevatorQueue$Pair

export const useNewElevatorQueue$Pair: FnCtor<NewElevatorQueue$Pair> = (container) => {
  const Record = container.resolve(useImmutableRecord)

  const newElevatorQueue$Pair: NewElevatorQueue$Pair =
    (elevator, queue$) => Record({ elevator, queue$ })()

  return newElevatorQueue$Pair
}
