
import { ElevatorId } from '/src/elevator/id'
import { useFunctionTapLog } from '/src/function/tapLog'
import { useImmutableOrderedSet } from '/src/pkg/immutable/OrderedSet'
import { useRxFilter } from '/src/pkg/rxjs/filter'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxTap } from '/src/pkg/rxjs/tap'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorQueue } from '../'
import { useElevatorQueueAction$ } from '../action/stream'
import { useElevatorQueueScan } from '../scan'

export type ElevatorQueue$ = Observable<ElevatorQueue>

type NewElevatorQueue$ = (e: ElevatorId, initQ?: ElevatorQueue) => ElevatorQueue$

export const useNewElevatorQueue$: Use<NewElevatorQueue$> = (container) => {
  const elevatorQueueAction$ = resolve(container)(useElevatorQueueAction$)
  const filter = resolve(container)(useRxFilter)
  const OrderedSet = resolve(container)(useImmutableOrderedSet)
  const queueScan = resolve(container)(useElevatorQueueScan)
  const scan = resolve(container)(useRxScan)
  const share = resolve(container)(useRxShare)
  const startWith = resolve(container)(useRxStartWith)
  const tap = resolve(container)(useRxTap)
  const tapLog = resolve(container)(useFunctionTapLog)

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
