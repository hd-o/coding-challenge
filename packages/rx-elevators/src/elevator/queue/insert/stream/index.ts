
import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { useElevatorPositionPair$Proxy } from '/src/elevator/position/pair/stream/proxy'
import { useElevatorQueueDoorOpenEvent$ } from '/src/elevator/queue/door/open/event'
import { useElevatorQueueInsertEvent$ } from '/src/elevator/queue/insert/event'
import { floorHeight } from '/src/floor/height'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'

type ElevatorQueueInsert$ = Observable<ElevatorFloorPair>

export const useElevatorQueueInsert$: Use<ElevatorQueueInsert$> = (container) => {
  const elevatorQueueDoorOpenEvent$ = resolve(container)(useElevatorQueueDoorOpenEvent$)
  const elevatorQueueInsertEvent$ = resolve(container)(useElevatorQueueInsertEvent$)
  const elevatorPositionPair$Proxy = resolve(container)(useElevatorPositionPair$Proxy)
  const of = resolve(container)(useRxOf)
  const switchMap = resolve(container)(useRxSwitchMap)
  const withLatestFrom = resolve(container)(useRxWithLatestFrom)

  const elevatorQueueInsert$ = elevatorQueueInsertEvent$.pipe(
    withLatestFrom(elevatorPositionPair$Proxy),
    switchMap(([insertPair, elevatorPositionPairs]): Observable<ElevatorFloorPair> => {
      const elevatorPositionPair = elevatorPositionPairs.find(({ elevator }) => elevator === insertPair.elevator)
      if (elevatorPositionPair?.position === insertPair.floor * floorHeight) {
        elevatorQueueDoorOpenEvent$.next(insertPair.elevator)
        return of()
      }
      return of(insertPair)
    }))

  return elevatorQueueInsert$
}
