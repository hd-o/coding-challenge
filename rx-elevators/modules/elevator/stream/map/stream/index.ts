import { Observable } from 'rxjs'
import { FnCtor } from '../../../../function/container'
import { useNewMapFromTuple } from '../../../../map/from/tuple'
import { Map$ } from '../../../../map/stream'
import { useRxMap } from '../../../../pkg/rxjs/map'
import { useRxShareReplay } from '../../../../pkg/rxjs/shareReplay'
import { ElevatorId } from '../../../id'
import { useElevatorId$ } from '../../../id/stream'

type NewElevator$Map$ =
  <Value, Value$ extends Observable<Value>>
  (newValue$: (e: ElevatorId) => Value$) => Map$<ElevatorId, Value$>

export const useNewElevator$Map$: FnCtor<NewElevator$Map$> = (container) => {
  const elevatorId$ = container.resolve(useElevatorId$)
  const map = container.resolve(useRxMap)
  const newMapFromTuple = container.resolve(useNewMapFromTuple)
  const shareReplay = container.resolve(useRxShareReplay)

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
