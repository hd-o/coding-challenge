import { ElevatorId } from '/src/elevator/id'
import { useNewElevator$Map$ } from '/src/elevator/stream/map/stream'
import { Map$ } from '/src/map/stream'
import { resolve, Use } from '/src/util/resolve'
import { ElevatorPosition$, useNewElevatorPosition$ } from '../..'

type ElevatorPosition$Map$ = Map$<ElevatorId, ElevatorPosition$>

export const useElevatorPosition$Map$: Use<ElevatorPosition$Map$> = (container) => {
  const newElevator$Map$ = resolve(container)(useNewElevator$Map$)
  const newElevatorPosition$ = resolve(container)(useNewElevatorPosition$)

  return newElevator$Map$(newElevatorPosition$)
}
