import { elevatorDoorMovementTypes } from '/src/elevator/door/movement/types'
import { elevatorDoorPositions } from '/src/elevator/door/position'
import { ElevatorDoorState } from '/src/elevator/door/state'
import { ElevatorId } from '/src/elevator/id'
import { useElevatorQueueDoorClosedEvent$ } from '/src/elevator/queue/door/closed/event'
import { FnCtor } from '/src/function/container'
import { useLodashRound } from '/src/pkg/lodash/round'
import { Settings } from '/src/settings/stream'

const movementTypes = elevatorDoorMovementTypes

type ElevatorDoorStateScanHandleOpen =
  (e: ElevatorId, props: [ElevatorDoorState, Settings]) => ElevatorDoorState

export const useElevatorDoorStateScanHandleOpen: FnCtor<ElevatorDoorStateScanHandleOpen> = (container) => {
  const elevatorQueueDoorClosedEvent$ = container.resolve(useElevatorQueueDoorClosedEvent$)
  const round = container.resolve(useLodashRound)

  const elevatorDoorStateScanHandleOpen: ElevatorDoorStateScanHandleOpen = (elevator, [state, settings]) => {
    const speed = settings.elevatorDoorMovementStep
    if (state.movementState === movementTypes.Closed) {
      elevatorQueueDoorClosedEvent$.next(elevator)
    }
    if (state.movementState === movementTypes.Opening) {
      if (state.position === elevatorDoorPositions.open) return state.set('movementState', movementTypes.Open)
      return state.set('position', round(state.position - speed, 2))
    }
    if (state.movementState === movementTypes.Open) {
      if (state.waitCount < 200) return state.set('waitCount', state.waitCount + 1)
      return state.set('waitCount', 0).set('movementState', movementTypes.Closing)
    }
    if (state.movementState === movementTypes.Closing) {
      if (state.position === elevatorDoorPositions.closed) {
        elevatorQueueDoorClosedEvent$.next(elevator)
        return state.set('movementState', movementTypes.Closed)
      }
      return state.set('position', round(state.position + speed, 2))
    }
    return state
  }

  return elevatorDoorStateScanHandleOpen
}
