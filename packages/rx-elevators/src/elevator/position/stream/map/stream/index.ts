import { ElevatorId } from '/src/elevator/id'
import { useNewElevator$Map$ } from '/src/elevator/stream/map/stream'
import { Map$ } from '/src/map/stream'
import { Use } from '/src/util/resolve'
import { ElevatorPosition$, useNewElevatorPosition$ } from '../..'

type ElevatorPosition$Map$ = Map$<ElevatorId, ElevatorPosition$>

export const useElevatorPosition$Map$: Use<ElevatorPosition$Map$> = (resolve) => {
  const newElevator$Map$ = resolve(useNewElevator$Map$)
  const newElevatorPosition$ = resolve(useNewElevatorPosition$)

  return newElevator$Map$(newElevatorPosition$)
}
