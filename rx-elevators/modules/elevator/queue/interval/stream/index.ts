import { Observable } from 'rxjs'
import { ElevatorQueue } from '../..'
import { FnCtor } from '../../../../function/container'
import { useInterval$ } from '../../../../interval/stream'
import { useRamdaIdentity } from '../../../../pkg/ramda/identity'
import { useRxMap } from '../../../../pkg/rxjs/map'
import { useRxOf } from '../../../../pkg/rxjs/of'
import { useRxShare } from '../../../../pkg/rxjs/share'
import { useRxSwitchMap } from '../../../../pkg/rxjs/switchMap'
import { ElevatorId } from '../../../id'
import { useElevatorQueue$Map$ } from '../../stream/map/stream'

type NewElevatorQueueInterval$ = (e: ElevatorId) => Observable<ElevatorQueue>

export const useNewElevatorQueueInterval$: FnCtor<NewElevatorQueueInterval$> = (container) => {
  const elevatorQueue$Map$ = container.resolve(useElevatorQueue$Map$)
  const identity = container.resolve(useRamdaIdentity)
  const interval$ = container.resolve(useInterval$)
  const map = container.resolve(useRxMap)
  const of = container.resolve(useRxOf)
  const switchMap = container.resolve(useRxSwitchMap)
  const share = container.resolve(useRxShare)

  const animationFrame$ = interval$.pipe(switchMap(identity))

  const newElevatorQueueInterval$: NewElevatorQueueInterval$ = (elevator) =>
    elevatorQueue$Map$.pipe(
      switchMap(map => map.get(elevator) ?? of()),
      // If queue is not empty: subscribe to interval$ for processing queued items
      switchMap(queue => queue.isEmpty() ? of(queue) : animationFrame$.pipe(map(() => queue))),
      share())

  return newElevatorQueueInterval$
}
