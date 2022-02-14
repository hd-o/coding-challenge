import { Observable } from 'rxjs'
import { ElevatorFloorPair } from '../../../elevator/floor/pair'
import { useElevatorPositionPair$Proxy } from '../../../elevator/position/pair/stream/proxy'
import { useElevatorQueuePair$Proxy } from '../../../elevator/queue/pair/stream/proxy'
import { FnCtor } from '../../../function/container'
import { useRxSkipWhile } from '../../../pkg/rxjs/skipWhile'
import { useRxSwitchMap } from '../../../pkg/rxjs/switchMap'
import { useRxWithLatestFrom } from '../../../pkg/rxjs/withLatestFrom'
import { useFloorRequestEvent$ } from '../event/stream'
import { useFloorRequestMapper } from '../mapper'

type FloorRequest$ = Observable<ElevatorFloorPair>

export const useFloorRequest$: FnCtor<FloorRequest$> = (container) => {
  const elevatorPositionPair$Proxy = container.resolve(useElevatorPositionPair$Proxy)
  const elevatorQueuePair$Proxy = container.resolve(useElevatorQueuePair$Proxy)
  const event$ = container.resolve(useFloorRequestEvent$)
  const floorRequestMapper = container.resolve(useFloorRequestMapper)
  const skipWhile = container.resolve(useRxSkipWhile)
  const switchMap = container.resolve(useRxSwitchMap)
  const withLatestFrom = container.resolve(useRxWithLatestFrom)

  const floorRequest$ = event$.pipe(
    withLatestFrom(elevatorQueuePair$Proxy, elevatorPositionPair$Proxy),
    skipWhile(([, queuePairs]) => queuePairs.length === 0),
    switchMap(floorRequestMapper))

  return floorRequest$
}
