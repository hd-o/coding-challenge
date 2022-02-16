import { ElevatorId } from '/src/elevator/id'
import { useElevatorQueue$Map$ } from '/src/elevator/queue/stream/map/stream'
import { FnCtor } from '/src/function/container'
import { useRamdaMemoizeWith } from '/src/pkg/ramda/memoizeWith'
import { useRxAnimationFrames } from '/src/pkg/rxjs/animationFrames'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { Observable } from 'rxjs'
import { ElevatorQueue } from '../..'

type NewElevatorQueueInterval$ = (e: ElevatorId) => Observable<ElevatorQueue>

export const useNewElevatorQueueInterval$: FnCtor<NewElevatorQueueInterval$> = (container) => {
  const animationFrames = container.resolve(useRxAnimationFrames)
  const elevatorQueue$Map$ = container.resolve(useElevatorQueue$Map$)
  const map = container.resolve(useRxMap)
  const memoizeWith = container.resolve(useRamdaMemoizeWith)
  const of = container.resolve(useRxOf)
  const switchMap = container.resolve(useRxSwitchMap)
  const share = container.resolve(useRxShare)

  const newElevatorQueueInterval$: NewElevatorQueueInterval$ = (elevator) =>
    elevatorQueue$Map$.pipe(
      switchMap(map => map.get(elevator) ?? of()),
      // If queue is not empty: subscribe to interval$ for processing queued items
      switchMap(queue => queue.isEmpty() ? of(queue) : animationFrames().pipe(map(() => queue))),
      share())

  return memoizeWith(String, newElevatorQueueInterval$)
}
