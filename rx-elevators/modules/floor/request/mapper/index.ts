import { Observable } from 'rxjs'
import { ElevatorFloorPair, useNewElevatorFloorPair } from '../../../elevator/floor/pair'
import { ElevatorPositionPair } from '../../../elevator/position/pair'
import { useElevatorQueueContainsFloor } from '../../../elevator/queue/contains/floor'
import { useElevatorQueueDoorOpenEvent$ } from '../../../elevator/queue/door/open/event'
import { ElevatorQueuePair } from '../../../elevator/queue/pair'
import { FnCtor } from '../../../function/container'
import { useRxOf } from '../../../pkg/rxjs/of'
import { floorHeight } from '../../height'
import { FloorNumber } from '../../number'

type FloorRequestTriple = [FloorNumber, ElevatorQueuePair[], ElevatorPositionPair[]]
type FloorRequestMapper = (floorQueuePair: FloorRequestTriple) => Observable<ElevatorFloorPair>

export const useFloorRequestMapper: FnCtor<FloorRequestMapper> = (container) => {
  const doorOpenEvent$ = container.resolve(useElevatorQueueDoorOpenEvent$)
  const newElevatorFloorPair = container.resolve(useNewElevatorFloorPair)
  const of = container.resolve(useRxOf)
  const queueContainsFloor = container.resolve(useElevatorQueueContainsFloor)

  /**
   * Logic for selecting an elevator on floor request.
   * Takes a floorNumber, and current state of all elevator queues.
   * @returns If elevator available, return Add action for elevatorQueueEvent$
   */
  const floorRequestMapper: FloorRequestMapper = (requestTriple) => {
    const [floor, elevatorQueuePairs, elevatorPositionPairs] = requestTriple
    const pairAtFloor = elevatorPositionPairs.find(({ position }) => position === floor * floorHeight)
    // Open door if elevator already at floor
    if (pairAtFloor !== undefined) {
      doorOpenEvent$.next(pairAtFloor.elevator)
      return of()
    }
    // Sort floors, and call elevator with least queued floors
    const sortedQueuesWithoutFloor = elevatorQueuePairs
      .filter(({ queue }) => !queueContainsFloor(queue, floor))
      .sort((a, b) => a.queue.size - b.queue.size)
    // Floor has been called if lengths are different
    if (sortedQueuesWithoutFloor.length !== elevatorQueuePairs.length) return of()
    const [availablePair] = sortedQueuesWithoutFloor
    return availablePair === undefined ? of() : of(newElevatorFloorPair(availablePair.elevator, floor))
  }

  return floorRequestMapper
}
