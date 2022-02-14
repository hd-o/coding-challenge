import { Subject } from 'rxjs'
import { FnCtor } from '../../../../function/container'
import { useRxSubject } from '../../../../pkg/rxjs/Subject'
import { ElevatorFloorPair } from '../../../floor/pair'

type ElevatorQueueInsertEvent$ = Subject<ElevatorFloorPair>

export const useEelevatorQueueInsertEvent$: FnCtor<ElevatorQueueInsertEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorFloorPair>()
}
