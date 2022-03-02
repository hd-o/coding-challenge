import { ElevatorId } from '/src/elevator/id'
import { useNewElevatorQueueInterval$ } from '/src/elevator/queue/interval/stream'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { useSettings$ } from '/src/settings/stream'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorDoorState, useNewElevatorDoorState } from '../'
import { useElevatorDoorStateScan } from '../scan'

export type ElevatorDoorState$ = Observable<ElevatorDoorState>

type NewElevatorDoorState$ = (e: ElevatorId, s?: ElevatorDoorState) => ElevatorDoorState$

export const useNewElevatorDoorState$: Use<NewElevatorDoorState$> = (container) => {
  const newDoorState = resolve(container)(useNewElevatorDoorState)
  const scan = resolve(container)(useRxScan)
  const share = resolve(container)(useRxShare)
  const startWith = resolve(container)(useRxStartWith)
  const stateScan = resolve(container)(useElevatorDoorStateScan)
  const newElevatorQueueInterval$ = resolve(container)(useNewElevatorQueueInterval$)
  const settings$ = resolve(container)(useSettings$)
  const withLatestFrom = resolve(container)(useRxWithLatestFrom)

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
