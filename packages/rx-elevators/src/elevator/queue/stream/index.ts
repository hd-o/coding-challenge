import { ElevatorId } from '/src/elevator/id'
import { useFunctionTapLog } from '/src/function/tapLog'
import { useImmutableOrderedSet } from '/src/pkg/immutable/OrderedSet'
import { useRxFilter } from '/src/pkg/rxjs/filter'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxTap } from '/src/pkg/rxjs/tap'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorQueue } from '../'
import { useElevatorQueueAction$ } from '../action/stream'
import { useElevatorQueueScan } from '../scan'

export type ElevatorQueue$ = Observable<ElevatorQueue>

type NewElevatorQueue$ = (e: ElevatorId, initQ?: ElevatorQueue) => ElevatorQueue$

export const useNewElevatorQueue$: Use<NewElevatorQueue$> = (resolve) => {
  const elevatorQueueAction$ = resolve(useElevatorQueueAction$)
  const filter = resolve(useRxFilter)
  const OrderedSet = resolve(useImmutableOrderedSet)
  const queueScan = resolve(useElevatorQueueScan)
  const scan = resolve(useRxScan)
  const share = resolve(useRxShare)
  const startWith = resolve(useRxStartWith)
  const tap = resolve(useRxTap)
  const tapLog = resolve(useFunctionTapLog)

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
