import { FloorNumber } from '/src/floor/number'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

type FloorRequestEvent$ = Subject<FloorNumber>

export const useFloorRequestEvent$: Use<FloorRequestEvent$> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<FloorNumber>()
}
