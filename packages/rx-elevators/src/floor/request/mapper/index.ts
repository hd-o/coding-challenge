import { ElevatorFloorPair, useNewElevatorFloorPair } from '/src/elevator/floor/pair'
import { ElevatorPositionPair } from '/src/elevator/position/pair'
import { useElevatorQueueContainsFloor } from '/src/elevator/queue/contains/floor'
import { useElevatorQueueDoorOpenEvent$ } from '/src/elevator/queue/door/open/event'
import { ElevatorQueuePair } from '/src/elevator/queue/pair'
import { floorHeight } from '/src/floor/height'
import { FloorNumber } from '/src/floor/number'
import { useRxOf } from '/src/pkg/rxjs/of'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'

type FloorRequestTriple = [FloorNumber, ElevatorQueuePair[], ElevatorPositionPair[]]
type FloorRequestMapper = (floorQueuePair: FloorRequestTriple) => Observable<ElevatorFloorPair>

export const useFloorRequestMapper: Use<FloorRequestMapper> = (container) => {
  const doorOpenEvent$ = resolve(container)(useElevatorQueueDoorOpenEvent$)
  const newElevatorFloorPair = resolve(container)(useNewElevatorFloorPair)
  const of = resolve(container)(useRxOf)
  const queueContainsFloor = resolve(container)(useElevatorQueueContainsFloor)

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
