import { useNewElevatorPair$ } from '/src/elevator/pair/stream'
import { useElevatorPosition$Map$ } from '/src/elevator/position/stream/map/stream'
import { FnCtor } from '/src/function/container'
import { Observable } from 'rxjs'
import { ElevatorPositionPair } from '../'

type ElevatorPositionPair$ = Observable<ElevatorPositionPair[]>

export const useElevatorPositionPair$: FnCtor<ElevatorPositionPair$> = (container) => {
  const elevatorPosition$Map$ = container.resolve(useElevatorPosition$Map$)
  const newElevatorPair$ = container.resolve(useNewElevatorPair$)

  return newElevatorPair$<ElevatorPositionPair>(elevatorPosition$Map$, 'position')
}
