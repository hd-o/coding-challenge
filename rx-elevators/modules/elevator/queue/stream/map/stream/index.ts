import { ElevatorQueue$, useNewElevatorQueue$ } from '../..'
import { FnCtor } from '../../../../../function/container'
import { Map$ } from '../../../../../map/stream'
import { ElevatorId } from '../../../../id'
import { useNewElevator$Map$ } from '../../../../stream/map/stream'

type ElevatorQueue$Map$ = Map$<ElevatorId, ElevatorQueue$>

export const useElevatorQueue$Map$: FnCtor<ElevatorQueue$Map$> = (container) => {
  const newElevator$Map$ = container.resolve(useNewElevator$Map$)
  const newElevatorQueue$ = container.resolve(useNewElevatorQueue$)

  const elevatorQueue$Map$: ElevatorQueue$Map$ = newElevator$Map$(newElevatorQueue$)

  return elevatorQueue$Map$
}
