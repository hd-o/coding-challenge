import { useNewElevatorPair$ } from '/src/elevator/pair/stream'
import { useElevatorQueue$Map$ } from '/src/elevator/queue/stream/map/stream'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorQueuePair } from '../'

type ElevatorQueuePair$ = Observable<ElevatorQueuePair[]>

export const useElevatorQueuePair$: Use<ElevatorQueuePair$> = (container) => {
  const elevatorQueue$Map$ = resolve(container)(useElevatorQueue$Map$)
  const newElevatorPair$ = resolve(container)(useNewElevatorPair$)

  return newElevatorPair$<ElevatorQueuePair>(elevatorQueue$Map$, 'queue')
}
