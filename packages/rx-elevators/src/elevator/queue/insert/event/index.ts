import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { resolve, Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

type ElevatorQueueInsertEvent$ = Subject<ElevatorFloorPair>

export const useElevatorQueueInsertEvent$: Use<ElevatorQueueInsertEvent$> = (container) => {
  const Subject = resolve(container)(useRxSubject)
  return new Subject<ElevatorFloorPair>()
}
