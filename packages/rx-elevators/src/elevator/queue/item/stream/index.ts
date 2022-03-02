
import { ElevatorId } from '/src/elevator/id'
import { ElevatorQueueItem } from '/src/elevator/queue/item'
import { useElevatorQueuePair$ } from '/src/elevator/queue/pair/stream'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'

type NewElevatorQueueItems$ = (e: ElevatorId) => Observable<ElevatorQueueItem[]>

export const useNewElevatorQueueItem$: Use<NewElevatorQueueItems$> = (container) => {
  const elevatorQueuePair$ = resolve(container)(useElevatorQueuePair$)
  const map = resolve(container)(useRxMap)
  const share = resolve(container)(useRxShare)
  const startWith = resolve(container)(useRxStartWith)

  const newElevatorQueueItems$: NewElevatorQueueItems$ = (elevator) =>
    elevatorQueuePair$.pipe(
      map(pairs => pairs.find(pair => pair.elevator === elevator)),
      map((pair) => pair?.queue.toArray() ?? []),
      share(),
      startWith([]),
    )

  return newElevatorQueueItems$
}
