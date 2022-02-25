import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { useElevatorPositionPair$Proxy } from '/src/elevator/position/pair/stream/proxy'
import { useElevatorQueuePair$Proxy } from '/src/elevator/queue/pair/stream/proxy'
import { FnCtor } from '/src/function/container'
import { useRxSkipWhile } from '/src/pkg/rxjs/skipWhile'
import { useRxSwitchMap } from '/src/pkg/rxjs/switchMap'
import { useRxWithLatestFrom } from '/src/pkg/rxjs/withLatestFrom'
import { Observable } from 'rxjs'
import { useFloorRequestEvent$ } from '../event/stream'
import { useFloorRequestMapper } from '../mapper'

export type FloorRequest$ = Observable<ElevatorFloorPair>

export const useFloorRequest$: FnCtor<FloorRequest$> = (container) => {
  const elevatorPositionPair$Proxy = container.resolve(useElevatorPositionPair$Proxy)
  const elevatorQueuePair$Proxy = container.resolve(useElevatorQueuePair$Proxy)
  const floorRequestEvent$ = container.resolve(useFloorRequestEvent$)
  const floorRequestMapper = container.resolve(useFloorRequestMapper)
  const skipWhile = container.resolve(useRxSkipWhile)
  const switchMap = container.resolve(useRxSwitchMap)
  const withLatestFrom = container.resolve(useRxWithLatestFrom)

  const floorRequest$ = floorRequestEvent$.pipe(
    withLatestFrom(elevatorQueuePair$Proxy, elevatorPositionPair$Proxy),
    skipWhile(([, queuePairs]) => queuePairs.length === 0),
    switchMap(floorRequestMapper))

  return floorRequest$
}
