import { ElevatorId } from '/src/elevator/id'
import { useElevatorId$ } from '/src/elevator/id/stream'
import { FnCtor } from '/src/function/container'
import { useNewMapFromTuple } from '/src/map/from/tuple'
import { Map$ } from '/src/map/stream'
import { useRxMap } from '/src/pkg/rxjs/map'
import { shareReplay } from 'rxjs'
import { ElevatorDoorState$, useNewElevatorDoorState$ } from '../'

type ElevatorDoorState$Tuple = [ElevatorId, ElevatorDoorState$]

type NewElevatorDoorState$Tuple = (e: ElevatorId) => ElevatorDoorState$Tuple

type ElevatorDoorState$Map$ = Map$<ElevatorId, ElevatorDoorState$>

export const useElevatorDoorState$Map$: FnCtor<ElevatorDoorState$Map$> = (container) => {
  const elevatorId$ = container.resolve(useElevatorId$)
  const map = container.resolve(useRxMap)
  const newElevatorDoorState$ = container.resolve(useNewElevatorDoorState$)
  const newMapFromTuple = container.resolve(useNewMapFromTuple)

  const newElevatorDoorState$Tuple: NewElevatorDoorState$Tuple =
    (elevator) => [elevator, newElevatorDoorState$(elevator)]

  const elevatorDoorState$Map$ = elevatorId$.pipe(
    map(ids => ids.map(newElevatorDoorState$Tuple)),
    map(newMapFromTuple),
    shareReplay(1))

  return elevatorDoorState$Map$
}
