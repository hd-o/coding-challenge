import { FloorNumber } from '../../../floor/number'
import { useFloorRequestEvent$ } from '../../../floor/request/event/stream'
import { FnCtor } from '../../../function/container'
import { useMockInterval$ } from './interval$'

type EmitFloorRequest = (f: FloorNumber[]) => void

export const useEmitFloorRequest: FnCtor<EmitFloorRequest> = (container) => {
  const floorRequestEvent$ = container.resolve(useFloorRequestEvent$)
  const mockInterval$ = container.resolve(useMockInterval$)

  const emitFloorRequest: EmitFloorRequest = (floors) => {
    floors.forEach(floor => floorRequestEvent$.next(floor))
    mockInterval$.next({})
  }

  return emitFloorRequest
}
