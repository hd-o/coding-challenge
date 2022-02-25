import { useElevatorQueuePair$ } from '/src/elevator/queue/pair/stream'
import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { Observable } from 'rxjs'

type NewFloorRequested$ = (f: FloorNumber) => Observable<boolean>

export const useNewFloorRequested$: FnCtor<NewFloorRequested$> = (container) => {
  const elevatorQueuePair$ = container.resolve(useElevatorQueuePair$)
  const map = container.resolve(useRxMap)
  const startsWith = container.resolve(useRxStartWith)

  const newFloorRequested$: NewFloorRequested$ = (floor) =>
    elevatorQueuePair$.pipe(
      map(pairs => pairs.find(pair =>
        pair.queue.find(item => 'floor' in item && item.floor === floor))),
      map(pair => pair !== undefined),
      startsWith(false))

  return newFloorRequested$
}
