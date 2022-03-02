import { ElevatorId } from '/src/elevator/id'
import { useElevatorQueue$Map$ } from '/src/elevator/queue/stream/map/stream'
import { useRamdaMemoizeWith } from '/src/pkg/ramda/memoizeWith'
import { useRxAnimationFrames } from '/src/pkg/rxjs/animationFrames'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorQueue } from '../..'

type NewElevatorQueueInterval$ = (e: ElevatorId) => Observable<ElevatorQueue>

export const useNewElevatorQueueInterval$: Use<NewElevatorQueueInterval$> = (container) => {
  const animationFrames = resolve(container)(useRxAnimationFrames)
  const elevatorQueue$Map$ = resolve(container)(useElevatorQueue$Map$)
  const map = resolve(container)(useRxMap)
  const memoizeWith = resolve(container)(useRamdaMemoizeWith)
  const of = resolve(container)(useRxOf)
  const switchMap = resolve(container)(useRxSwitchMap)
  const share = resolve(container)(useRxShare)

  const newElevatorQueueInterval$: NewElevatorQueueInterval$ = (elevator) =>
    elevatorQueue$Map$.pipe(
      switchMap(map => map.get(elevator) ?? of()),
      // If queue is not empty: subscribe to interval$ for processing queued items
      switchMap(queue => queue.isEmpty() ? of(queue) : animationFrames().pipe(map(() => queue))),
      share())

  return memoizeWith(String, newElevatorQueueInterval$)
}
