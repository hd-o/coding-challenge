import { Observable } from 'rxjs'
import { ElevatorPositionPair } from '../'
import { FnCtor } from '../../../../function/container'
import { useNewElevatorPair$ } from '../../../pair/stream'
import { useElevatorPosition$Map$ } from '../../stream/map/stream'

type ElevatorPositionPair$ = Observable<ElevatorPositionPair[]>

export const useElevatorPositionPair$: FnCtor<ElevatorPositionPair$> = (container) => {
  const elevatorPosition$Map$ = container.resolve(useElevatorPosition$Map$)
  const newElevatorPair$ = container.resolve(useNewElevatorPair$)

  return newElevatorPair$<ElevatorPositionPair>(elevatorPosition$Map$, 'position')
}
