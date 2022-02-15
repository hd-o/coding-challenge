import { Observable } from 'rxjs'
import { useElevatorQueuePair$ } from '../../../elevator/queue/pair/stream'
import { FnCtor } from '../../../function/container'
import { useRxMap } from '../../../pkg/rxjs/map'
import { useRxStartWith } from '../../../pkg/rxjs/startWith'
import { FloorNumber } from '../../number'

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
