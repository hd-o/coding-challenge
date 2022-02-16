import { useNewElevatorPair$ } from '/src/elevator/pair/stream'
import { useElevatorQueue$Map$ } from '/src/elevator/queue/stream/map/stream'
import { FnCtor } from '/src/function/container'
import { Observable } from 'rxjs'
import { ElevatorQueuePair } from '../'

type ElevatorQueuePair$ = Observable<ElevatorQueuePair[]>

export const useElevatorQueuePair$: FnCtor<ElevatorQueuePair$> = (container) => {
  const elevatorQueue$Map$ = container.resolve(useElevatorQueue$Map$)
  const newElevatorPair$ = container.resolve(useNewElevatorPair$)

  return newElevatorPair$<ElevatorQueuePair>(elevatorQueue$Map$, 'queue')
}