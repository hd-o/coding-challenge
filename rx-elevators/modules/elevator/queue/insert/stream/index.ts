import { Observable } from 'rxjs'
import { floorHeight } from '../../../../floor/height'
import { FnCtor } from '../../../../function/container'
import { useRxOf } from '../../../../pkg/rxjs/of'
import { useRxSwitchMap } from '../../../../pkg/rxjs/switchMap'
import { useRxWithLatestFrom } from '../../../../pkg/rxjs/withLatestFrom'
import { ElevatorFloorPair } from '../../../floor/pair'
import { useElevatorPositionPair$Proxy } from '../../../position/pair/stream/proxy'
import { useElevatorQueueDoorOpenEvent$ } from '../../door/open/event'
import { useEelevatorQueueInsertEvent$ } from '../event'

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
