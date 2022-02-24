import { elevatorQueueDoorActionTypes } from '/src/elevator/queue/door/action/type'
import { useElevatorQueueDoorClosedEvent$ } from '/src/elevator/queue/door/closed/event'
import { useElevatorQueueDoorOpenEvent$ } from '/src/elevator/queue/door/open/event'
import { elevatorQueueFloorActionTypes } from '/src/elevator/queue/floor/action/type'
import { useElevatorQueueInsert$ } from '/src/elevator/queue/insert/stream'
import { useElevatorQueueRemoveEvent$ } from '/src/elevator/queue/remove/event/stream'
import { useFloorRequest$ } from '/src/floor/request/stream'
import { FnCtor } from '/src/function/container'
import { useFunctionTapLog } from '/src/function/tapLog'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxMerge } from '/src/pkg/rxjs/merge'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxTap } from '/src/pkg/rxjs/tap'
import { Observable } from 'rxjs'
import { ElevatorQueueAction } from '../'
import { useElevatorQueueActionMapDoorItem } from '../map/door/item'
import { useElevatorQueueMapFloorAction } from '../map/floor/action'

const doorActionTypes = elevatorQueueDoorActionTypes
const floorActionTypes = elevatorQueueFloorActionTypes

type ElevatorQueueAction$ = Observable<ElevatorQueueAction>

export const useElevatorQueueAction$: FnCtor<ElevatorQueueAction$> = (container) => {
  const doorClosedEvent$ = container.resolve(useElevatorQueueDoorClosedEvent$)
  const doorOpenEvent$ = container.resolve(useElevatorQueueDoorOpenEvent$)
  const floorRequest$ = container.resolve(useFloorRequest$)
  const insert$ = container.resolve(useElevatorQueueInsert$)
  const map = container.resolve(useRxMap)
  const mapDoorItem = container.resolve(useElevatorQueueActionMapDoorItem)
  const mapFloorAction = container.resolve(useElevatorQueueMapFloorAction)
  const merge = container.resolve(useRxMerge)
  const removeEvent$ = container.resolve(useElevatorQueueRemoveEvent$)
  const share = container.resolve(useRxShare)
  const tap = container.resolve(useRxTap)
  const tapLog = container.resolve(useFunctionTapLog)

  const elevatorQueueAction$: ElevatorQueueAction$ = merge(
    doorClosedEvent$.pipe(map(mapDoorItem(doorActionTypes.Closed))),
    doorOpenEvent$.pipe(map(mapDoorItem(doorActionTypes.Open))),
    floorRequest$.pipe(map(mapFloorAction(floorActionTypes.Add))),
    insert$.pipe(map(mapFloorAction(floorActionTypes.Add))),
    removeEvent$.pipe(map(mapFloorAction(floorActionTypes.Remove))),
  ).pipe(
    tap(tapLog('elevatorQueueAction$')),
    share(),
  )

  return elevatorQueueAction$
}
