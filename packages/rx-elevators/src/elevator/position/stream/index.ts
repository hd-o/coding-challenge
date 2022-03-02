import { ElevatorId } from '/src/elevator/id'
import { useNewElevatorQueueInterval$ } from '/src/elevator/queue/interval/stream'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { useSettings$ } from '/src/settings/stream'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorPosition } from '../'
import { newElevatorPositionScan } from '../scan'

export type ElevatorPosition$ = Observable<ElevatorPosition>

type NewElevatorPosition$ = (e: ElevatorId) => ElevatorPosition$

export const useNewElevatorPosition$: Use<NewElevatorPosition$> = (resolve) => {
  const elevatorPositionScan = resolve(newElevatorPositionScan)
  const newElevatorQueueInterval$ = resolve(useNewElevatorQueueInterval$)
  const scan = resolve(useRxScan)
  const share = resolve(useRxShare)
  const startWith = resolve(useRxStartWith)
  const settings$ = resolve(useSettings$)
  const withLatestFrom = resolve(useRxWithLatestFrom)

  const newElevatorPosition$: NewElevatorPosition$ = (elevator) =>
    newElevatorQueueInterval$(elevator).pipe(
      withLatestFrom(settings$),
      scan(elevatorPositionScan(elevator), 0),
      share(),
      startWith(0),
    )

  return newElevatorPosition$
}
