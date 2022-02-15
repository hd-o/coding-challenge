import { Observable } from 'rxjs'
import { ElevatorQueue } from '../..'
import { FnCtor } from '../../../../function/container'
import { useRamdaMemoizeWith } from '../../../../pkg/ramda/memoizeWith'
import { useRxAnimationFrames } from '../../../../pkg/rxjs/animationFrames'
import { useRxMap } from '../../../../pkg/rxjs/map'
import { useRxOf } from '../../../../pkg/rxjs/of'
import { useRxShare } from '../../../../pkg/rxjs/share'
import { useRxSwitchMap } from '../../../../pkg/rxjs/switchMap'
import { ElevatorId } from '../../../id'
import { useElevatorQueue$Map$ } from '../../stream/map/stream'

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
