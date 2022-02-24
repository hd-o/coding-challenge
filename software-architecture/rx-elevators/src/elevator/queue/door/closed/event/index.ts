import { ElevatorId } from '/src/elevator/id'
import { FnCtor } from '/src/function/container'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Subject } from 'rxjs'

type ElevatorQueueDoorClosedEvent$ = Subject<ElevatorId>

export const useElevatorQueueDoorClosedEvent$: FnCtor<ElevatorQueueDoorClosedEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorId>()
}
