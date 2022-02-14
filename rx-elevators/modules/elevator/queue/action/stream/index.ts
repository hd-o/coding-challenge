import { Observable } from 'rxjs'
import { ElevatorQueueAction } from '../'
import { useFloorRequest$ } from '../../../../floor/request/stream'
import { FnCtor } from '../../../../function/container'
import { useFunctionTapLog } from '../../../../function/tapLog'
import { useRxMap } from '../../../../pkg/rxjs/map'
import { useRxMerge } from '../../../../pkg/rxjs/merge'
import { useRxShare } from '../../../../pkg/rxjs/share'
import { useRxTap } from '../../../../pkg/rxjs/tap'
import { elevatorQueueDoorActionTypes } from '../../door/action/type'
import { useElevatorQueueDoorClosedEvent$ } from '../../door/closed/event'
import { useElevatorQueueDoorOpenEvent$ } from '../../door/open/event'
import { elevatorQueueFloorActionTypes } from '../../floor/action/type'
import { useElevatorQueueInsert$ } from '../../insert/stream'
import { useElevatorQueueRemoveEvent$ } from '../../remove/event/stream'
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
