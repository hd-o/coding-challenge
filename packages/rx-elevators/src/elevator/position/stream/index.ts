
import { ElevatorId } from '/src/elevator/id'
import { useNewElevatorQueueInterval$ } from '/src/elevator/queue/interval/stream'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { useSettings$ } from '/src/settings/stream'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorPosition } from '../'
import { newElevatorPositionScan } from '../scan'

export type ElevatorPosition$ = Observable<ElevatorPosition>

type NewElevatorPosition$ = (e: ElevatorId) => ElevatorPosition$

export const useNewElevatorPosition$: Use<NewElevatorPosition$> = (container) => {
  const elevatorPositionScan = resolve(container)(newElevatorPositionScan)
  const newElevatorQueueInterval$ = resolve(container)(useNewElevatorQueueInterval$)
  const scan = resolve(container)(useRxScan)
  const share = resolve(container)(useRxShare)
  const startWith = resolve(container)(useRxStartWith)
  const settings$ = resolve(container)(useSettings$)
  const withLatestFrom = resolve(container)(useRxWithLatestFrom)

  const newElevatorPosition$: NewElevatorPosition$ = (elevator) =>
    newElevatorQueueInterval$(elevator).pipe(
      withLatestFrom(settings$),
      scan(elevatorPositionScan(elevator), 0),
      share(),
      startWith(0),
    )

  return newElevatorPosition$
}
