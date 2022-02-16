import { ElevatorId } from '/src/elevator/id'
import { useNewElevator$Map$ } from '/src/elevator/stream/map/stream'
import { FnCtor } from '/src/function/container'
import { Map$ } from '/src/map/stream'
import { ElevatorPosition$, useNewElevatorPosition$ } from '../..'

type ElevatorPosition$Map$ = Map$<ElevatorId, ElevatorPosition$>

export const useElevatorPosition$Map$: FnCtor<ElevatorPosition$Map$> = (container) => {
  const newElevator$Map$ = container.resolve(useNewElevator$Map$)
  const newElevatorPosition$ = container.resolve(useNewElevatorPosition$)

  return newElevator$Map$(newElevatorPosition$)
}
