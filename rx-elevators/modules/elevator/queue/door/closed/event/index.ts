import { Subject } from 'rxjs'
import { FnCtor } from '../../../../../function/container'
import { useRxSubject } from '../../../../../pkg/rxjs/Subject'
import { ElevatorId } from '../../../../id'

type ElevatorQueueDoorClosedEvent$ = Subject<ElevatorId>

export const useElevatorQueueDoorClosedEvent$: FnCtor<ElevatorQueueDoorClosedEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorId>()
}
