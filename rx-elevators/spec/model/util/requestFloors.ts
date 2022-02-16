import { useNewElevatorFloorPair } from '../../../modules/elevator/floor/pair'
import { ElevatorId } from '../../../modules/elevator/id'
import { useEelevatorQueueInsertEvent$ } from '../../../modules/elevator/queue/insert/event'
import { FloorNumber } from '../../../modules/floor/number'
import { FnCtor } from '../../../modules/function/container'
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
