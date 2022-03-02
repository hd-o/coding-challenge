import { useElevatorQueuePair$ } from '/src/elevator/queue/pair/stream'
import { FloorNumber } from '/src/floor/number'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'

type NewFloorRequested$ = (f: FloorNumber) => Observable<boolean>

export const useNewFloorRequested$: Use<NewFloorRequested$> = (resolve) => {
  const elevatorQueuePair$ = resolve(useElevatorQueuePair$)
  const map = resolve(useRxMap)
  const startsWith = resolve(useRxStartWith)

  const newFloorRequested$: NewFloorRequested$ = (floor) =>
    elevatorQueuePair$.pipe(
      map(pairs => pairs.find(pair =>
        pair.queue.find(item => 'floor' in item && item.floor === floor))),
      map(pair => pair !== undefined),
      startsWith(false))

  return newFloorRequested$
}
