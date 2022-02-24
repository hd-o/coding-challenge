import { FloorNumber } from '/src/floor/number'
import { FnCtor } from '/src/function/container'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Subject } from 'rxjs'

type FloorRequestEvent$ = Subject<FloorNumber>

export const useFloorRequestEvent$: FnCtor<FloorRequestEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<FloorNumber>()
}
