import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { FnCtor } from '/src/function/container'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Subject } from 'rxjs'

type ElevatorQueueInsertEvent$ = Subject<ElevatorFloorPair>

export const useElevatorQueueInsertEvent$: FnCtor<ElevatorQueueInsertEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorFloorPair>()
}
