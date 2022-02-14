import { Observable } from 'rxjs'
import { ElevatorDoorState, useNewElevatorDoorState } from '../'
import { FnCtor } from '../../../../function/container'
import { useRamdaMemoizeWith } from '../../../../pkg/ramda/memoizeWith'
import { useRamdaToString } from '../../../../pkg/ramda/toString'
import { useRxScan } from '../../../../pkg/rxjs/scan'
import { useRxShare } from '../../../../pkg/rxjs/share'
import { useRxStartWith } from '../../../../pkg/rxjs/startWith'
import { ElevatorId } from '../../../id'
import { useNewElevatorQueueInterval$ } from '../../../queue/interval/stream'
import { useElevatorDoorStateScan } from '../scan'

export type ElevatorDoorState$ = Observable<ElevatorDoorState>

type NewElevatorDoorState$ = (e: ElevatorId, s?: ElevatorDoorState) => ElevatorDoorState$

export const useNewElevatorDoorState$: FnCtor<() => NewElevatorDoorState$> = (container) => {
  const memoizeWith = container.resolve(useRamdaMemoizeWith)
  const newDoorState = container.resolve(useNewElevatorDoorState)
  const scan = container.resolve(useRxScan)
  const share = container.resolve(useRxShare)
  const startWith = container.resolve(useRxStartWith)
  const stateScan = container.resolve(useElevatorDoorStateScan)
  const toString = container.resolve(useRamdaToString)
  const newElevatorQueueInterval$ = container.resolve(useNewElevatorQueueInterval$)

  const initialState = newDoorState()

  const newElevatorDoorState$: NewElevatorDoorState$ = (elevator) =>
    newElevatorQueueInterval$(elevator).pipe(
      scan(stateScan(elevator), initialState),
      share(),
      startWith(initialState))

  return () => memoizeWith(toString, newElevatorDoorState$)
}
