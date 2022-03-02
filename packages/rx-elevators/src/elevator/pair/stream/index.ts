import { ElevatorId } from '/src/elevator/id'
import { Map$ } from '/src/map/stream'
import { useImmutableRecord } from '/src/pkg/immutable/Record'
import { useRxCombineLatest } from '/src/pkg/rxjs/combineLatest'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxShareReplay } from '/src/pkg/rxjs/shareReplay'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { resolve, Use } from '/src/util/resolve'
import { RecordOf } from 'immutable'
import { Observable } from 'rxjs'

type NewElevatorPair$ =
  <PairType extends { elevator: ElevatorId }>
  (
    map$: Map$<ElevatorId, Observable<any>>,
    recordKey: Exclude<keyof PairType, 'elevator'>,
  //
  ) => Observable<PairType[]>

export const useNewElevatorPair$: Use<NewElevatorPair$> = (container) => {
  const combineLatest = resolve(container)(useRxCombineLatest)
  const map = resolve(container)(useRxMap)
  const Record = resolve(container)(useImmutableRecord)
  const shareReplay = resolve(container)(useRxShareReplay)
  const switchMap = resolve(container)(useRxSwitchMap)

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
      shareReplay(1),
    )
  }

  return newElevatorPair$
}
