import { Observable } from 'rxjs'
import { ElevatorQueuePair } from '../'
import { FnCtor } from '../../../../function/container'
import { useNewElevatorPair$ } from '../../../pair/stream'
import { useElevatorQueue$Map$ } from '../../stream/map/stream'

type ElevatorQueuePair$ = Observable<ElevatorQueuePair[]>

export const useElevatorQueuePair$: FnCtor<ElevatorQueuePair$> = (container) => {
  const elevatorQueue$Map$ = container.resolve(useElevatorQueue$Map$)
  const newElevatorPair$ = container.resolve(useNewElevatorPair$)

  return newElevatorPair$<ElevatorQueuePair>(elevatorQueue$Map$, 'queue')
}
