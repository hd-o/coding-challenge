import { useNewElevatorFloorPair } from '/src/elevator/floor/pair'
import { ElevatorId } from '/src/elevator/id'
import { useEelevatorQueueInsertEvent$ } from '/src/elevator/queue/insert/event'
import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
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
