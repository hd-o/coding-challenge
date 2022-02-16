import { ElevatorFloorPair } from '/src/floor/pair'
import { FnCtor } from '/src/function/container'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Subject } from 'rxjs'

type ElevatorQueueInsertEvent$ = Subject<ElevatorFloorPair>

export const useEelevatorQueueInsertEvent$: FnCtor<ElevatorQueueInsertEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorFloorPair>()
}
