import { ElevatorId } from '/src/elevator/id'
import { FnCtor } from '/src/function/container'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Subject } from 'rxjs'

type ElevatorQueueDoorOpenEvent$ = Subject<ElevatorId>

export const useElevatorQueueDoorOpenEvent$: FnCtor<ElevatorQueueDoorOpenEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorId>()
}
