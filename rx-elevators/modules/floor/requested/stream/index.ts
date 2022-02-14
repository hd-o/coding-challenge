import { Observable } from 'rxjs'
import { useElevatorQueuePair$ } from '../../../elevator/queue/pair/stream'
import { FnCtor } from '../../../function/container'
import { useRamdaMemoizeWith } from '../../../pkg/ramda/memoizeWith'
import { useRamdaToString } from '../../../pkg/ramda/toString'
import { useRxMap } from '../../../pkg/rxjs/map'
import { useRxStartWith } from '../../../pkg/rxjs/startWith'
import { FloorNumber } from '../../number'

type NewFloorRequested$ = (f: FloorNumber) => Observable<boolean>

export const useNewFloorRequested$: FnCtor<NewFloorRequested$> = (container) => {
  const elevatorQueuePair$ = container.resolve(useElevatorQueuePair$)
  const map = container.resolve(useRxMap)
  const memoizeWith = container.resolve(useRamdaMemoizeWith)
  const startsWith = container.resolve(useRxStartWith)
  const toString = container.resolve(useRamdaToString)

  const newFloorRequested$: NewFloorRequested$ = (floor) =>
    elevatorQueuePair$.pipe(
      map(pairs => pairs.find(pair =>
        pair.queue.find(item => 'floor' in item && item.floor === floor))),
      map(pair => pair !== undefined),
      startsWith(false))

  return memoizeWith(toString, newFloorRequested$)
}
