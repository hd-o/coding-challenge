import { ElevatorId } from '../../../modules/elevator/id'
import { useElevatorPositionPair$ } from '../../../modules/elevator/position/pair/stream'
import { ElevatorPosition$ } from '../../../modules/elevator/position/stream'
import { FnCtor } from '../../../modules/function/container'
import { useRxMap } from '../../../modules/pkg/rxjs/map'

type GetElevatorPosition$ = (elevator: ElevatorId) => ElevatorPosition$

export const useGetElevatorPosition$: FnCtor<GetElevatorPosition$> = (container) => {
  const elevatorPositionPair$ = container.resolve(useElevatorPositionPair$)
  const map = container.resolve(useRxMap)

  const getElevatorPosition$: GetElevatorPosition$ = (elevator) =>
    elevatorPositionPair$.pipe(map(pairs => pairs.filter(p => p.elevator === elevator)[0].position))

  return getElevatorPosition$
}
