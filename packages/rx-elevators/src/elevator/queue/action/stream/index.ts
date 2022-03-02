import { elevatorQueueDoorActionTypes } from '/src/elevator/queue/door/action/type'
import { useElevatorQueueDoorClosedEvent$ } from '/src/elevator/queue/door/closed/event'
import { useElevatorQueueDoorOpenEvent$ } from '/src/elevator/queue/door/open/event'
import { elevatorQueueFloorActionTypes } from '/src/elevator/queue/floor/action/type'
import { useElevatorQueueInsert$ } from '/src/elevator/queue/insert/stream'
import { useElevatorQueueRemoveEvent$ } from '/src/elevator/queue/remove/event/stream'
import { useFloorRequest$ } from '/src/floor/request/stream'
import { useFunctionTapLog } from '/src/function/tapLog'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxMerge } from '/src/pkg/rxjs/merge'
import { useRxShare } from '/src/pkg/rxjs/share'
import { useRxTap } from '/src/pkg/rxjs/tap'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorQueueAction } from '../'
import { useElevatorQueueActionMapDoorItem } from '../map/door/item'
import { useElevatorQueueMapFloorAction } from '../map/floor/action'

const doorActionTypes = elevatorQueueDoorActionTypes
const floorActionTypes = elevatorQueueFloorActionTypes

type ElevatorQueueAction$ = Observable<ElevatorQueueAction>

export const useElevatorQueueAction$: Use<ElevatorQueueAction$> = (resolve) => {
  const doorClosedEvent$ = resolve(useElevatorQueueDoorClosedEvent$)
  const doorOpenEvent$ = resolve(useElevatorQueueDoorOpenEvent$)
  const floorRequest$ = resolve(useFloorRequest$)
  const insert$ = resolve(useElevatorQueueInsert$)
  const map = resolve(useRxMap)
  const mapDoorItem = resolve(useElevatorQueueActionMapDoorItem)
  const mapFloorAction = resolve(useElevatorQueueMapFloorAction)
  const merge = resolve(useRxMerge)
  const removeEvent$ = resolve(useElevatorQueueRemoveEvent$)
  const share = resolve(useRxShare)
  const tap = resolve(useRxTap)
  const tapLog = resolve(useFunctionTapLog)

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
