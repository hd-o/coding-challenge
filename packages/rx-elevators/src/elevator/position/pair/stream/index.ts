import { useNewElevatorPair$ } from '/src/elevator/pair/stream'
import { useElevatorPosition$Map$ } from '/src/elevator/position/stream/map/stream'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorPositionPair } from '../'

type ElevatorPositionPair$ = Observable<ElevatorPositionPair[]>

export const useElevatorPositionPair$: Use<ElevatorPositionPair$> = (resolve) => {
  const elevatorPosition$Map$ = resolve(useElevatorPosition$Map$)
  const newElevatorPair$ = resolve(useNewElevatorPair$)

  return newElevatorPair$<ElevatorPositionPair>(elevatorPosition$Map$, 'position')
}
