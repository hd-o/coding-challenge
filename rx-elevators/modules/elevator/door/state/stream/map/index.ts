import { ElevatorDoorState$, useNewElevatorDoorState$ } from '../'
import { FnCtor } from '../../../../../function/container'
import { useNewMapFromTuple } from '../../../../../map/from/tuple'
import { Map$ } from '../../../../../map/stream'
import { useRxMap } from '../../../../../pkg/rxjs/map'
import { ElevatorId } from '../../../../id'
import { useElevatorId$ } from '../../../../id/stream'

type ElevatorDoorState$Tuple = [ElevatorId, ElevatorDoorState$]

type NewElevatorDoorState$Tuple = (e: ElevatorId) => ElevatorDoorState$Tuple

type ElevatorDoorState$Map$ = Map$<ElevatorId, ElevatorDoorState$>

export const useElevatorDoorState$Map$: FnCtor<ElevatorDoorState$Map$> = (container) => {
  const elevatorId$ = container.resolve(useElevatorId$)
  const map = container.resolve(useRxMap)
  const newElevatorDoorState$ = container.resolve(useNewElevatorDoorState$)()
  const newMapFromTuple = container.resolve(useNewMapFromTuple)

  const newElevatorDoorState$Tuple: NewElevatorDoorState$Tuple =
    (elevator) => [elevator, newElevatorDoorState$(elevator)]

  const elevatorDoorState$Map$ = elevatorId$.pipe(
    map(ids => ids.map(newElevatorDoorState$Tuple)),
    map(newMapFromTuple))

  return elevatorDoorState$Map$
}
