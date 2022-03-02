import { ElevatorId } from '/src/elevator/id'
import { useElevatorId$ } from '/src/elevator/id/stream'
import { useNewMapFromTuple } from '/src/map/from/tuple'
import { Map$ } from '/src/map/stream'
import { useRxMap } from '/src/pkg/rxjs/map'
import { resolve, Use } from '/src/util/resolve'
import { shareReplay } from 'rxjs'
import { ElevatorDoorState$, useNewElevatorDoorState$ } from '../'

type ElevatorDoorState$Tuple = [ElevatorId, ElevatorDoorState$]

type NewElevatorDoorState$Tuple = (e: ElevatorId) => ElevatorDoorState$Tuple

type ElevatorDoorState$Map$ = Map$<ElevatorId, ElevatorDoorState$>

export const useElevatorDoorState$Map$: Use<ElevatorDoorState$Map$> = (container) => {
  const elevatorId$ = resolve(container)(useElevatorId$)
  const map = resolve(container)(useRxMap)
  const newElevatorDoorState$ = resolve(container)(useNewElevatorDoorState$)
  const newMapFromTuple = resolve(container)(useNewMapFromTuple)

  const newElevatorDoorState$Tuple: NewElevatorDoorState$Tuple =
    (elevator) => [elevator, newElevatorDoorState$(elevator)]

  const elevatorDoorState$Map$ = elevatorId$.pipe(
    map(ids => ids.map(newElevatorDoorState$Tuple)),
    map(newMapFromTuple),
    shareReplay(1))

  return elevatorDoorState$Map$
}
