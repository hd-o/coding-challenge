import { ElevatorDoorState } from '/src/elevator/door/state'
import { ElevatorId } from '/src/elevator/id'
import { FnCtor } from '/src/function/container'
import { useRxMap } from '/src/pkg/rxjs/map'
import { Observable } from 'rxjs'
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
