
import { ElevatorId } from '/src/elevator/id'
import { useNewElevator$Map$ } from '/src/elevator/stream/map/stream'
import { Map$ } from '/src/map/stream'
import { resolve, Use } from '/src/util/resolve'
import { ElevatorQueue$, useNewElevatorQueue$ } from '../..'

type ElevatorQueue$Map$ = Map$<ElevatorId, ElevatorQueue$>

export const useElevatorQueue$Map$: Use<ElevatorQueue$Map$> = (container) => {
  const newElevator$Map$ = resolve(container)(useNewElevator$Map$)
  const newElevatorQueue$ = resolve(container)(useNewElevatorQueue$)

  const elevatorQueue$Map$: ElevatorQueue$Map$ = newElevator$Map$(newElevatorQueue$)

  return elevatorQueue$Map$
}
