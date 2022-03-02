
import { useNewElevatorPair$ } from '/src/elevator/pair/stream'
import { useElevatorPosition$Map$ } from '/src/elevator/position/stream/map/stream'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorPositionPair } from '../'

type ElevatorPositionPair$ = Observable<ElevatorPositionPair[]>

export const useElevatorPositionPair$: Use<ElevatorPositionPair$> = (container) => {
  const elevatorPosition$Map$ = resolve(container)(useElevatorPosition$Map$)
  const newElevatorPair$ = resolve(container)(useNewElevatorPair$)

  return newElevatorPair$<ElevatorPositionPair>(elevatorPosition$Map$, 'position')
}
