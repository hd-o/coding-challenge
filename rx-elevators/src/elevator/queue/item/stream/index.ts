import { ElevatorId } from '/src/elevator/id'
import { ElevatorQueueItem } from '/src/elevator/queue/item'
import { useElevatorQueuePair$ } from '/src/elevator/queue/pair/stream'
import { FnCtor } from '/src/function/container'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { Observable } from 'rxjs'

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
