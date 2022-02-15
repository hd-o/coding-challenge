import { Observable } from 'rxjs'
import { ElevatorQueueItem } from '../..'
import { FnCtor } from '../../../../function/container'
import { useRxMap } from '../../../../pkg/rxjs/map'
import { useRxShare } from '../../../../pkg/rxjs/share'
import { useRxStartWith } from '../../../../pkg/rxjs/startWith'
import { ElevatorId } from '../../../id'
import { useElevatorQueuePair$ } from '../../pair/stream'

type NewElevatorQueueItems$ = (e: ElevatorId) => Observable<ElevatorQueueItem[]>

export const useNewElevatorQueueItem$: FnCtor<NewElevatorQueueItems$> = (container) => {
  const elevatorQueuePair$ = container.resolve(useElevatorQueuePair$)
  const map = container.resolve(useRxMap)
  const share = container.resolve(useRxShare)
  const startWith = container.resolve(useRxStartWith)

  const newElevatorQueueItems$: NewElevatorQueueItems$ = (elevator) =>
    elevatorQueuePair$.pipe(
      map(pairs => pairs.find(pair => pair.elevator === elevator)),
      map((pair) => pair?.queue.toArray() ?? []),
      share(),
      startWith([]),
    )

  return newElevatorQueueItems$
}
