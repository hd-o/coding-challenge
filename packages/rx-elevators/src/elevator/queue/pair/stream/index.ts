import { useNewElevatorPair$ } from '/src/elevator/pair/stream'
import { useElevatorQueue$Map$ } from '/src/elevator/queue/stream/map/stream'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorQueuePair } from '../'

type ElevatorQueuePair$ = Observable<ElevatorQueuePair[]>

export const useElevatorQueuePair$: Use<ElevatorQueuePair$> = (resolve) => {
  const elevatorQueue$Map$ = resolve(useElevatorQueue$Map$)
  const newElevatorPair$ = resolve(useNewElevatorPair$)

  return newElevatorPair$<ElevatorQueuePair>(elevatorQueue$Map$, 'queue')
}
