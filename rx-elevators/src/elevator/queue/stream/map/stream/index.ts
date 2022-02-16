import { ElevatorId } from '/src/elevator/id'
import { useNewElevator$Map$ } from '/src/elevator/stream/map/stream'
import { FnCtor } from '/src/function/container'
import { Map$ } from '/src/map/stream'
import { ElevatorQueue$, useNewElevatorQueue$ } from '../..'

type ElevatorQueue$Map$ = Map$<ElevatorId, ElevatorQueue$>

export const useElevatorQueue$Map$: FnCtor<ElevatorQueue$Map$> = (container) => {
  const newElevator$Map$ = container.resolve(useNewElevator$Map$)
  const newElevatorQueue$ = container.resolve(useNewElevatorQueue$)

  const elevatorQueue$Map$: ElevatorQueue$Map$ = newElevator$Map$(newElevatorQueue$)

  return elevatorQueue$Map$
}
