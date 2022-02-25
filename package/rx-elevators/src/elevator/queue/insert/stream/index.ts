import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { useElevatorPositionPair$Proxy } from '/src/elevator/position/pair/stream/proxy'
import { useElevatorQueueDoorOpenEvent$ } from '/src/elevator/queue/door/open/event'
import { useEelevatorQueueInsertEvent$ } from '/src/elevator/queue/insert/event'
import { floorHeight } from '/src/floor/height'
import { FnCtor } from '/src/function/container'
import { useRxOf } from '/src/pkg/rxjs/of'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { Observable } from 'rxjs'

type ElevatorQueueInsert$ = Observable<ElevatorFloorPair>

export const useElevatorQueueInsert$: FnCtor<ElevatorQueueInsert$> = (container) => {
  const elevatorQueueDoorOpenEvent$ = container.resolve(useElevatorQueueDoorOpenEvent$)
  const elevatorQueueInsertEvent$ = container.resolve(useEelevatorQueueInsertEvent$)
  const elevatorPositionPair$Proxy = container.resolve(useElevatorPositionPair$Proxy)
  const of = container.resolve(useRxOf)
  const switchMap = container.resolve(useRxSwitchMap)
  const withLatestFrom = container.resolve(useRxWithLatestFrom)

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
