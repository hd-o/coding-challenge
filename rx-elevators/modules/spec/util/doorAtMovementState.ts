import { ElevatorDoorMovementTypes } from '../../elevator/door/movement/types'
import { ElevatorDoorState } from '../../elevator/door/state'
import { ElevatorId } from '../../elevator/id'
import { FnCtor } from '../../function/container'
import { useRxFilter } from '../../pkg/rxjs/filter'
import { useRxFirstValueFrom } from '../../pkg/rxjs/firstValueFrom'
import { useGetElevatorDoorState$ } from './getElevatorDoorState$'
import { useTickMockInterval$ } from './tickMockInterval$'

type DoorAtMovementState = (e: ElevatorId, m: ElevatorDoorMovementTypes) => Promise<ElevatorDoorState>

export const useDoorAtMovementState: FnCtor<DoorAtMovementState> = (container) => {
  const filter = container.resolve(useRxFilter)
  const firstValueFrom = container.resolve(useRxFirstValueFrom)
  const getElevatorDoorState$ = container.resolve(useGetElevatorDoorState$)
  const tickInterval$ = container.resolve(useTickMockInterval$)

  const doorAtMovementState: DoorAtMovementState = (elevator, movementState) => {
    const doorState$ = getElevatorDoorState$(elevator).pipe(
      tickInterval$(),
      filter(state => state.movementState === movementState))
    return firstValueFrom(doorState$)
  }

  return doorAtMovementState
}
