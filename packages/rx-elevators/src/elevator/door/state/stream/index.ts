import { ElevatorId } from '/src/elevator/id'
import { useNewElevatorQueueInterval$ } from '/src/elevator/queue/interval/stream'
import { FnCtor } from '/src/function/container'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { useSettings$ } from '/src/settings/stream'
import { Observable } from 'rxjs'
import { ElevatorDoorState, useNewElevatorDoorState } from '../'
import { useElevatorDoorStateScan } from '../scan'

export type ElevatorDoorState$ = Observable<ElevatorDoorState>

type NewElevatorDoorState$ = (e: ElevatorId, s?: ElevatorDoorState) => ElevatorDoorState$

export const useNewElevatorDoorState$: FnCtor<NewElevatorDoorState$> = (container) => {
  const newDoorState = container.resolve(useNewElevatorDoorState)
  const scan = container.resolve(useRxScan)
  const share = container.resolve(useRxShare)
  const startWith = container.resolve(useRxStartWith)
  const stateScan = container.resolve(useElevatorDoorStateScan)
  const newElevatorQueueInterval$ = container.resolve(useNewElevatorQueueInterval$)
  const settings$ = container.resolve(useSettings$)
  const withLatestFrom = container.resolve(useRxWithLatestFrom)

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
