import { ElevatorId } from '/src/elevator/id'
import { useNewElevatorQueueInterval$ } from '/src/elevator/queue/interval/stream'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { useSettings$ } from '/src/settings/stream'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorDoorState, useNewElevatorDoorState } from '../'
import { useElevatorDoorStateScan } from '../scan'

export type ElevatorDoorState$ = Observable<ElevatorDoorState>

type NewElevatorDoorState$ = (e: ElevatorId, s?: ElevatorDoorState) => ElevatorDoorState$

export const useNewElevatorDoorState$: Use<NewElevatorDoorState$> = (resolve) => {
  const newDoorState = resolve(useNewElevatorDoorState)
  const scan = resolve(useRxScan)
  const share = resolve(useRxShare)
  const startWith = resolve(useRxStartWith)
  const stateScan = resolve(useElevatorDoorStateScan)
  const newElevatorQueueInterval$ = resolve(useNewElevatorQueueInterval$)
  const settings$ = resolve(useSettings$)
  const withLatestFrom = resolve(useRxWithLatestFrom)

  const initialState = newDoorState()

  const newElevatorDoorState$: NewElevatorDoorState$ = (elevator) =>
    newElevatorQueueInterval$(elevator).pipe(
      withLatestFrom(settings$),
      scan(stateScan(elevator), initialState),
      share(),
      startWith(initialState),
    )

  return newElevatorDoorState$
}
