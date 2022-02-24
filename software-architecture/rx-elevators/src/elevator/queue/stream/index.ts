import { ElevatorId } from '/src/elevator/id'
import { FnCtor } from '/src/function/container'
import { useFunctionTapLog } from '/src/function/tapLog'
import { useImmutableOrderedSet } from '/src/pkg/immutable/OrderedSet'
import { useRxFilter } from '/src/pkg/rxjs/filter'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxTap } from '/src/pkg/rxjs/tap'
import { Observable } from 'rxjs'
import { ElevatorQueue } from '../'
import { useElevatorQueueAction$ } from '../action/stream'
import { useElevatorQueueScan } from '../scan'

export type ElevatorQueue$ = Observable<ElevatorQueue>

type NewElevatorQueue$ = (e: ElevatorId, initQ?: ElevatorQueue) => ElevatorQueue$

export const useNewElevatorQueue$: FnCtor<NewElevatorQueue$> = (container) => {
  const elevatorQueueAction$ = container.resolve(useElevatorQueueAction$)
  const filter = container.resolve(useRxFilter)
  const OrderedSet = container.resolve(useImmutableOrderedSet)
  const queueScan = container.resolve(useElevatorQueueScan)
  const scan = container.resolve(useRxScan)
  const share = container.resolve(useRxShare)
  const startWith = container.resolve(useRxStartWith)
  const tap = container.resolve(useRxTap)
  const tapLog = container.resolve(useFunctionTapLog)

  const newElevatorQueue$: NewElevatorQueue$ = (elevator, initQ = OrderedSet()) =>
    elevatorQueueAction$.pipe(
      filter((action) => action.elevator === elevator),
      scan(queueScan, initQ),
      share(),
      startWith(initQ),
      tap(tapLog('elevatorQueue$')),
    )

  return newElevatorQueue$
}
