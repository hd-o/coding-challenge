import { ElevatorId } from '/src/elevator/id'
import { useElevatorId$ } from '/src/elevator/id/stream'
import { useNewMapFromTuple } from '/src/map/from/tuple'
import { Map$ } from '/src/map/stream'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxShareReplay } from '/src/pkg/rxjs/shareReplay'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'

type NewElevator$Map$ =
  <Value, Value$ extends Observable<Value>>
  (newValue$: (e: ElevatorId) => Value$) => Map$<ElevatorId, Value$>

export const useNewElevator$Map$: Use<NewElevator$Map$> = (container) => {
  const elevatorId$ = resolve(container)(useElevatorId$)
  const map = resolve(container)(useRxMap)
  const newMapFromTuple = resolve(container)(useNewMapFromTuple)
  const shareReplay = resolve(container)(useRxShareReplay)

  /**
   * @param newValue$ Function that, given an ElevatorId, creates a stream of values (Value$)
   * @returns Stream subscribed to elevatorId$, that maps to a Map<ElevatorId, Value$>
   */
  const newElevator$Map$: NewElevator$Map$ = (newValue$) =>
    elevatorId$.pipe(
      map(ids => ids.map((elevator) => [elevator, newValue$(elevator)] as const)),
      map(newMapFromTuple),
      shareReplay(1))

  return newElevator$Map$
}
