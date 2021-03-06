import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { useElevatorPositionPair$Proxy } from '/src/elevator/position/pair/stream/proxy'
import { useElevatorQueueDoorOpenEvent$ } from '/src/elevator/queue/door/open/event'
import { useElevatorQueueInsertEvent$ } from '/src/elevator/queue/insert/event'
import { floorHeight } from '/src/floor/height'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'

type ElevatorQueueInsert$ = Observable<ElevatorFloorPair>

export const useElevatorQueueInsert$: Use<ElevatorQueueInsert$> = (resolve) => {
  const elevatorQueueDoorOpenEvent$ = resolve(useElevatorQueueDoorOpenEvent$)
  const elevatorQueueInsertEvent$ = resolve(useElevatorQueueInsertEvent$)
  const elevatorPositionPair$Proxy = resolve(useElevatorPositionPair$Proxy)
  const of = resolve(useRxOf)
  const switchMap = resolve(useRxSwitchMap)
  const withLatestFrom = resolve(useRxWithLatestFrom)

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
