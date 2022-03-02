import { FloorNumber } from '/src/floor/number'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { resolve, Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

type FloorRequestEvent$ = Subject<FloorNumber>

export const useFloorRequestEvent$: Use<FloorRequestEvent$> = (container) => {
  const Subject = resolve(container)(useRxSubject)
  return new Subject<FloorNumber>()
}
