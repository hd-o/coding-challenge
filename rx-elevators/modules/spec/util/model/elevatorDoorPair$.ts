import { Observable } from 'rxjs'
import { ElevatorDoorState } from '../../../elevator/door/state'
import { useElevatorDoorState$Map$ } from '../../../elevator/door/state/stream/map'
import { ElevatorId } from '../../../elevator/id'
import { useNewElevatorPair$ } from '../../../elevator/pair/stream'
import { FnCtor } from '../../../function/container'

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
