import { ElevatorId } from '/src/elevator/id'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

type ElevatorQueueDoorClosedEvent$ = Subject<ElevatorId>

export const useElevatorQueueDoorClosedEvent$: Use<ElevatorQueueDoorClosedEvent$> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<ElevatorId>()
}
