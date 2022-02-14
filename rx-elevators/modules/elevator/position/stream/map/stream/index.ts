import { ElevatorPosition$, useNewElevatorPosition$ } from '../..'
import { FnCtor } from '../../../../../function/container'
import { Map$ } from '../../../../../map/stream'
import { ElevatorId } from '../../../../id'
import { useNewElevator$Map$ } from '../../../../stream/map/stream'

type ElevatorPosition$Map$ = Map$<ElevatorId, ElevatorPosition$>

export const useElevatorPosition$Map$: FnCtor<ElevatorPosition$Map$> = (container) => {
  const newElevator$Map$ = container.resolve(useNewElevator$Map$)
  const newElevatorPosition$ = container.resolve(useNewElevatorPosition$)

  return newElevator$Map$(newElevatorPosition$)
}
