import { ElevatorId } from '/src/elevator/id'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/resolve'
import { Subject } from 'rxjs'

type ElevatorQueueDoorOpenEvent$ = Subject<ElevatorId>

export const useElevatorQueueDoorOpenEvent$: Use<ElevatorQueueDoorOpenEvent$> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<ElevatorId>()
}
