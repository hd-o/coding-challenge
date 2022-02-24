import { ElevatorId } from '/src/elevator/id'
import { useNewElevatorQueueInterval$ } from '/src/elevator/queue/interval/stream'
import { FnCtor } from '/src/function/container'
import { useRxScan } from '/src/pkg/rxjs/scan'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxStartWith } from '/src/pkg/rxjs/startWith'
import { Observable } from 'rxjs'
import { ElevatorPosition } from '../'
import { newElevatorPositionScan } from '../scan'

export type ElevatorPosition$ = Observable<ElevatorPosition>

type NewElevatorPosition$ = (e: ElevatorId) => ElevatorPosition$

export const useNewElevatorPosition$: FnCtor<NewElevatorPosition$> = (container) => {
  const elevatorPositionScan = container.resolve(newElevatorPositionScan)
  const newElevatorQueueInterval$ = container.resolve(useNewElevatorQueueInterval$)
  const scan = container.resolve(useRxScan)
  const share = container.resolve(useRxShare)
  const startWith = container.resolve(useRxStartWith)

  const newElevatorPosition$: NewElevatorPosition$ = (elevator) =>
    newElevatorQueueInterval$(elevator).pipe(
      scan(elevatorPositionScan(elevator), 0),
      share(),
      startWith(0),
    )

  return newElevatorPosition$
}
