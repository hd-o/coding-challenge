import { Subject } from 'rxjs'
import { FnCtor } from '../../../../../function/container'
import { useRxSubject } from '../../../../../pkg/rxjs/Subject'
import { ElevatorFloorPair } from '../../../../floor/pair'

type ElevatorQueueRemoveEvent$ = Subject<ElevatorFloorPair>

export const useElevatorQueueRemoveEvent$: FnCtor<ElevatorQueueRemoveEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorFloorPair>()
}
