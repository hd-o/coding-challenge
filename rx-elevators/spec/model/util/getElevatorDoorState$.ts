import { Observable } from 'rxjs'
import { ElevatorDoorState } from '../../../modules/elevator/door/state'
import { ElevatorId } from '../../../modules/elevator/id'
import { FnCtor } from '../../../modules/function/container'
import { useRxMap } from '../../../modules/pkg/rxjs/map'
import { useElevatorDoorPair$ } from './elevatorDoorPair$'

type GetElevatorDoorState$ = (e: ElevatorId) => Observable<ElevatorDoorState>

export const useGetElevatorDoorState$: FnCtor<GetElevatorDoorState$> = (container) => {
  const elevatorDoorPair$ = container.resolve(useElevatorDoorPair$)
  const map = container.resolve(useRxMap)

  const getElevatorDoorState$: GetElevatorDoorState$ = (elevator) =>
    elevatorDoorPair$.pipe(
      map(pairs => pairs.filter(p => p.elevator === elevator)[0].doorState),
    )

  return getElevatorDoorState$
}
