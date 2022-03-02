import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { useElevatorPositionPair$Proxy } from '/src/elevator/position/pair/stream/proxy'
import { useElevatorQueuePair$Proxy } from '/src/elevator/queue/pair/stream/proxy'
import { useRxSkipWhile } from '/src/pkg/rxjs/skipWhile'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { useFloorRequestEvent$ } from '../event/stream'
import { useFloorRequestMapper } from '../mapper'

export type FloorRequest$ = Observable<ElevatorFloorPair>

export const useFloorRequest$: Use<FloorRequest$> = (resolve) => {
  const elevatorPositionPair$Proxy = resolve(useElevatorPositionPair$Proxy)
  const elevatorQueuePair$Proxy = resolve(useElevatorQueuePair$Proxy)
  const floorRequestEvent$ = resolve(useFloorRequestEvent$)
  const floorRequestMapper = resolve(useFloorRequestMapper)
  const skipWhile = resolve(useRxSkipWhile)
  const switchMap = resolve(useRxSwitchMap)
  const withLatestFrom = resolve(useRxWithLatestFrom)

  const floorRequest$ = floorRequestEvent$.pipe(
    withLatestFrom(elevatorQueuePair$Proxy, elevatorPositionPair$Proxy),
    skipWhile(([, queuePairs]) => queuePairs.length === 0),
    switchMap(floorRequestMapper))

  return floorRequest$
}
