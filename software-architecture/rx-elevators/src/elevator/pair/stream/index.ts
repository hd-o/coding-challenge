import { ElevatorId } from '/src/elevator/id'
import { FnCtor } from '/src/function/container'
import { Map$ } from '/src/map/stream'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { useRxCombineLatest } from '/src/pkg/rxjs/combineLatest'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { RecordOf } from 'immutable'
import { Observable } from 'rxjs'

type NewElevatorPair$ =
  <PairType extends { elevator: ElevatorId }>
  (
    map$: Map$<ElevatorId, Observable<any>>,
    recordKey: Exclude<keyof PairType, 'elevator'>,
  //
  ) => Observable<PairType[]>

export const useNewElevatorPair$: FnCtor<NewElevatorPair$> = (container) => {
  const combineLatest = container.resolve(useRxCombineLatest)
  const map = container.resolve(useRxMap)
  const Record = container.resolve(useImmutableRecord)
  const share = container.resolve(useRxShare)
  const switchMap = container.resolve(useRxSwitchMap)

  /**
   * @param entries$ Stream of map entries
   * @param recordKey Key to be used in emitted records
   * @returns Stream of records containing the ElevatorId as "elevator",
   * and the emitted value from the entry's value stream as [recordKey]
   */
  const newElevatorPair$: NewElevatorPair$ = (map$, recordKey) => {
    type Elevator$Tuple = [ElevatorId, Observable<any>]

    const newElevatorValuePair =
      (elevator: ElevatorId, value: any): RecordOf<any> =>
        Record({ elevator, [recordKey]: value })()

    const toElevatorValuePair$s =
      (tuples: Elevator$Tuple[]): Array<Observable<any>> =>
        tuples.map(([elevator, $]) => $.pipe(map(value => newElevatorValuePair(elevator, value))))

    return map$.pipe(
      map(map => map.entrySeq().toArray()),
      switchMap((entries) => combineLatest(toElevatorValuePair$s(entries))),
      share(),
    )
  }

  return newElevatorPair$
}
