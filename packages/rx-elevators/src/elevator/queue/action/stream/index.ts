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
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorQueueAction } from '../'
import { useElevatorQueueActionMapDoorItem } from '../map/door/item'
import { useElevatorQueueMapFloorAction } from '../map/floor/action'

const doorActionTypes = elevatorQueueDoorActionTypes
const floorActionTypes = elevatorQueueFloorActionTypes

type ElevatorQueueAction$ = Observable<ElevatorQueueAction>

export const useElevatorQueueAction$: Use<ElevatorQueueAction$> = (container) => {
  const doorClosedEvent$ = resolve(container)(useElevatorQueueDoorClosedEvent$)
  const doorOpenEvent$ = resolve(container)(useElevatorQueueDoorOpenEvent$)
  const floorRequest$ = resolve(container)(useFloorRequest$)
  const insert$ = resolve(container)(useElevatorQueueInsert$)
  const map = resolve(container)(useRxMap)
  const mapDoorItem = resolve(container)(useElevatorQueueActionMapDoorItem)
  const mapFloorAction = resolve(container)(useElevatorQueueMapFloorAction)
  const merge = resolve(container)(useRxMerge)
  const removeEvent$ = resolve(container)(useElevatorQueueRemoveEvent$)
  const share = resolve(container)(useRxShare)
  const tap = resolve(container)(useRxTap)
  const tapLog = resolve(container)(useFunctionTapLog)

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
