import { ElevatorFloorPair } from '/src/elevator/floor/pair'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { resolve, Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

type ElevatorQueueRemoveEvent$ = Subject<ElevatorFloorPair>

export const useElevatorQueueRemoveEvent$: Use<ElevatorQueueRemoveEvent$> = (container) => {
  const Subject = resolve(container)(useRxSubject)
  return new Subject<ElevatorFloorPair>()
}
