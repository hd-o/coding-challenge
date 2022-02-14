import { Subject } from 'rxjs'
import { FnCtor } from '../../../../../function/container'
import { useRxSubject } from '../../../../../pkg/rxjs/Subject'
import { ElevatorId } from '../../../../id'

type ElevatorQueueDoorOpenEvent$ = Subject<ElevatorId>

export const useElevatorQueueDoorOpenEvent$: FnCtor<ElevatorQueueDoorOpenEvent$> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorId>()
}
