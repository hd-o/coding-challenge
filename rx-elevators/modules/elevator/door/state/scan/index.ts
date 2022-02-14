import { ElevatorDoorState } from '../'
import { FnCtor } from '../../../../function/container'
import { ElevatorId } from '../../../id'
import { ElevatorQueue } from '../../../queue'
import { elevatorQueueDoorActionTypes } from '../../../queue/door/action/type'
import { elevatorQueueItemCategories } from '../../../queue/item/category'
import { elevatorDoorMovementTypes } from '../../movement/types'
import { useElevatorDoorStateScanHandleOpen } from './handle/open'

const actionTypes = elevatorQueueDoorActionTypes
const movementTypes = elevatorDoorMovementTypes
const queueItemCategory = elevatorQueueItemCategories

type Scan = (e: ElevatorId) => (s: ElevatorDoorState, q: ElevatorQueue) => ElevatorDoorState

export const useElevatorDoorStateScan: FnCtor<Scan> = (container) => {
  const handleOpen = container.resolve(useElevatorDoorStateScanHandleOpen)

  const doorStateScan: Scan = (elevator) => (state, queue) => {
    const nextItem = queue.first()
    if (nextItem === undefined) return state
    if (nextItem.category !== queueItemCategory.Door) return state
    if (nextItem.actionId !== state.currentActionId) {
      state = state
        .set('currentActionId', nextItem.actionId)
        .set('movementState', nextItem.type === actionTypes.Open
          ? movementTypes.Opening
          : movementTypes.Closing)
    }
    // For now, only door opening is needed because
    // door should always close after opening
    return handleOpen(elevator, state)
  }

  return doorStateScan
}
