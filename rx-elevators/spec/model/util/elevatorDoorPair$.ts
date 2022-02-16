import { Observable } from 'rxjs'
import { ElevatorDoorState } from '../../../modules/elevator/door/state'
import { useElevatorDoorState$Map$ } from '../../../modules/elevator/door/state/stream/map'
import { ElevatorId } from '../../../modules/elevator/id'
import { useNewElevatorPair$ } from '../../../modules/elevator/pair/stream'
import { FnCtor } from '../../../modules/function/container'

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
