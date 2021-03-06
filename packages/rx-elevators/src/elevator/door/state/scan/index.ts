import { elevatorDoorMovementTypes } from '/src/elevator/door/movement/types'
import { ElevatorId } from '/src/elevator/id'
import { ElevatorQueue } from '/src/elevator/queue'
import { elevatorQueueDoorActionTypes } from '/src/elevator/queue/door/action/type'
import { elevatorQueueItemCategories } from '/src/elevator/queue/item/category'
import { Settings } from '/src/settings/stream'
import { Use } from '/src/util/resolve'
import { ElevatorDoorState } from '../'
import { useElevatorDoorStateScanHandleOpen } from './handle/open'

const actionTypes = elevatorQueueDoorActionTypes
const movementTypes = elevatorDoorMovementTypes
const itemCategories = elevatorQueueItemCategories

type Scan =
  (e: ElevatorId) =>
  (s: ElevatorDoorState, props: [ElevatorQueue, Settings]) => ElevatorDoorState

export const useElevatorDoorStateScan: Use<Scan> = (resolve) => {
  const handleOpen = resolve(useElevatorDoorStateScanHandleOpen)

  const doorStateScan: Scan = (elevator) => (state, [queue, settings]) => {
    const nextItem = queue.first()
    if (nextItem === undefined) return state
    if (nextItem.category !== itemCategories.Door) return state
    if (nextItem.actionId !== state.currentActionId) {
      state = state
        .set('currentActionId', nextItem.actionId)
        .set('movementState', nextItem.type === actionTypes.Open
          ? movementTypes.Opening
          : movementTypes.Closing)
    }
    // For now, only door opening is needed because
    // door should always close after opening
    return handleOpen(elevator, [state, settings])
  }

  return doorStateScan
}
