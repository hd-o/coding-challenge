import { Subject } from 'rxjs'
import { FnCtor } from '../../../../function/container'
import { useRxSubject } from '../../../../pkg/rxjs/Subject'
import { FloorNumber } from '../../../number'

type FloorRequestEvent$ = Subject<FloorNumber>

export const useFloorRequestEvent$: FnCtor<FloorRequestEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<FloorNumber>()
}
