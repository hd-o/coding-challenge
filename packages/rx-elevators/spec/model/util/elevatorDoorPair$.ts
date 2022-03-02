import { ElevatorDoorState } from '/src/elevator/door/state'
import { useElevatorDoorState$Map$ } from '/src/elevator/door/state/stream/map'
import { ElevatorId } from '/src/elevator/id'
import { useNewElevatorPair$ } from '/src/elevator/pair/stream'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'

interface ElevatorDoorPair {
  doorState: ElevatorDoorState
  elevator: ElevatorId
}

type ElevatorDoorPair$ = Observable<ElevatorDoorPair[]>

export const useElevatorDoorPair$: Use<ElevatorDoorPair$> = (container) => {
  const newElevatorPair$ = resolve(container)(useNewElevatorPair$)
  const elevatorDoorState$Map$ = resolve(container)(useElevatorDoorState$Map$)
  return newElevatorPair$<ElevatorDoorPair>(elevatorDoorState$Map$, 'doorState')
}
