import { ElevatorId } from '/src/elevator/id'
import { useElevatorPositionPair$ } from '/src/elevator/position/pair/stream'
import { ElevatorPosition$ } from '/src/elevator/position/stream'
import { FnCtor } from '/src/function/container'
import { useRxMap } from '/src/pkg/rxjs/map'

type GetElevatorPosition$ = (elevator: ElevatorId) => ElevatorPosition$

export const useGetElevatorPosition$: FnCtor<GetElevatorPosition$> = (container) => {
  const elevatorPositionPair$ = container.resolve(useElevatorPositionPair$)
  const map = container.resolve(useRxMap)

  const getElevatorPosition$: GetElevatorPosition$ = (elevator) =>
    elevatorPositionPair$.pipe(map(pairs => pairs.filter(p => p.elevator === elevator)[0].position))

  return getElevatorPosition$
}
