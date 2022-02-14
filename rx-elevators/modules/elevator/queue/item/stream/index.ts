import { Observable } from 'rxjs'
import { ElevatorQueueItem } from '../..'
import { FnCtor } from '../../../../function/container'
import { useRamdaMemoizeWith } from '../../../../pkg/ramda/memoizeWith'
import { useRamdaToString } from '../../../../pkg/ramda/toString'
import { useRxMap } from '../../../../pkg/rxjs/map'
import { useRxStartWith } from '../../../../pkg/rxjs/startWith'
import { ElevatorId } from '../../../id'
import { useElevatorQueuePair$ } from '../../pair/stream'

type NewElevatorQueueItems$ = (e: ElevatorId) => Observable<ElevatorQueueItem[]>

export const useNewElevatorQueueItem$: FnCtor<NewElevatorQueueItems$> = (container) => {
  const elevatorQueuePair$ = container.resolve(useElevatorQueuePair$)
  const map = container.resolve(useRxMap)
  const memoizeWith = container.resolve(useRamdaMemoizeWith)
  const startWith = container.resolve(useRxStartWith)
  const toString = container.resolve(useRamdaToString)

  const newElevatorQueueItems$: NewElevatorQueueItems$ = (elevator) =>
    elevatorQueuePair$.pipe(
      map(pairs => pairs.find(pair => pair.elevator === elevator)),
      map((pair) => pair?.queue.toArray() ?? []),
      startWith([]))

  return memoizeWith(toString, newElevatorQueueItems$)
}
