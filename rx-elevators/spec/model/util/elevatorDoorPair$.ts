import { ElevatorDoorState } from '/src/elevator/door/state'
import { useElevatorDoorState$Map$ } from '/src/elevator/door/state/stream/map'
import { ElevatorId } from '/src/elevator/id'
import { useNewElevatorPair$ } from '/src/elevator/pair/stream'
import { FnCtor } from '/src/function/container'
import { Observable } from 'rxjs'

interface ElevatorDoorPair {
  elevator: ElevatorId
  doorState: ElevatorDoorState
}

type ElevatorDoorPair$ = Observable<ElevatorDoorPair[]>

export const useElevatorDoorPair$: FnCtor<ElevatorDoorPair$> = (container) => {
  const newElevatorPair$ = container.resolve(useNewElevatorPair$)
  const elevatorDoorState$Map$ = container.resolve(useElevatorDoorState$Map$)
  return newElevatorPair$<ElevatorDoorPair>(elevatorDoorState$Map$, 'doorState')
}
