import { useNewElevatorFloorPair } from '../../../elevator/floor/pair'
import { ElevatorId } from '../../../elevator/id'
import { useEelevatorQueueInsertEvent$ } from '../../../elevator/queue/insert/event'
import { FloorNumber } from '../../../floor/number'
import { FnCtor } from '../../../function/container'
import { useMockInterval$ } from './interval$'

export type RequestFloors = (elevator: ElevatorId, floors: FloorNumber[]) => void

export const useRequestFloors: FnCtor<RequestFloors> = (container) => {
  const elevatorQueueInsertEvent$ = container.resolve(useEelevatorQueueInsertEvent$)
  const mockInterval$ = container.resolve(useMockInterval$)
  const newElevatorFloorPair = container.resolve(useNewElevatorFloorPair)

  const requestFloors: RequestFloors = (elevator, floors) => {
    floors.forEach(floor => elevatorQueueInsertEvent$.next(newElevatorFloorPair(elevator, floor)))
    mockInterval$.next({})
  }

  return requestFloors
}
