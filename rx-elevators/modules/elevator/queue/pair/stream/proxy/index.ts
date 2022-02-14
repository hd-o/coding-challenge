import { Subject } from 'rxjs'
import { ElevatorQueuePair } from '../..'
import { FnCtor } from '../../../../../function/container'
import { useRxSubject } from '../../../../../pkg/rxjs/Subject'

type ElevatorQueuePair$Proxy = Subject<ElevatorQueuePair[]>

export const useElevatorQueuePair$Proxy: FnCtor<ElevatorQueuePair$Proxy> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorQueuePair[]>()
}
