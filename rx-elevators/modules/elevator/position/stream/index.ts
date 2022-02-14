import { Observable } from 'rxjs'
import { ElevatorPosition } from '../'
import { FnCtor } from '../../../function/container'
import { useRamdaMemoizeWith } from '../../../pkg/ramda/memoizeWith'
import { useRxScan } from '../../../pkg/rxjs/scan'
import { useRxShare } from '../../../pkg/rxjs/share'
import { useRxStartWith } from '../../../pkg/rxjs/startWith'
import { ElevatorId } from '../../id'
import { useNewElevatorQueueInterval$ } from '../../queue/interval/stream'
import { newElevatorPositionScan } from '../scan'

export type ElevatorPosition$ = Observable<ElevatorPosition>

type NewElevatorPosition$ = (e: ElevatorId) => ElevatorPosition$

export const useNewElevatorPosition$: FnCtor<NewElevatorPosition$> = (container) => {
  const elevatorPositionScan = container.resolve(newElevatorPositionScan)
  const memoizeWith = container.resolve(useRamdaMemoizeWith)
  const newElevatorQueueInterval$ = container.resolve(useNewElevatorQueueInterval$)
  const scan = container.resolve(useRxScan)
  const share = container.resolve(useRxShare)
  const startWith = container.resolve(useRxStartWith)

  const newElevatorPosition$: NewElevatorPosition$ = (elevator) =>
    newElevatorQueueInterval$(elevator).pipe(
      scan(elevatorPositionScan(elevator), 0),
      share(),
      startWith(0))

  return memoizeWith(String, newElevatorPosition$)
}
