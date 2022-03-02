import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

type ElevatorQueueInsertEvent$ = Subject<ElevatorFloorPair>

export const useElevatorQueueInsertEvent$: Use<ElevatorQueueInsertEvent$> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<ElevatorFloorPair>()
}
