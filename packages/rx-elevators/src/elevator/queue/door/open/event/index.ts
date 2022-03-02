import { ElevatorId } from '/src/elevator/id'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { resolve, Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

type ElevatorQueueDoorOpenEvent$ = Subject<ElevatorId>

export const useElevatorQueueDoorOpenEvent$: Use<ElevatorQueueDoorOpenEvent$> = (container) => {
  const Subject = resolve(container)(useRxSubject)
  return new Subject<ElevatorId>()
}
