import { ElevatorFloorPair } from '/src/floor/pair'
import { FnCtor } from '/src/function/container'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Subject } from 'rxjs'

type ElevatorQueueRemoveEvent$ = Subject<ElevatorFloorPair>

export const useElevatorQueueRemoveEvent$: FnCtor<ElevatorQueueRemoveEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorFloorPair>()
}
