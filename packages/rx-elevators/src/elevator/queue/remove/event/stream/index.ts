import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

type ElevatorQueueRemoveEvent$ = Subject<ElevatorFloorPair>

export const useElevatorQueueRemoveEvent$: Use<ElevatorQueueRemoveEvent$> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<ElevatorFloorPair>()
}
