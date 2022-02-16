import { FnCtor } from '/src/function/container'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Subject } from 'rxjs'
import { ElevatorQueuePair } from '../..'

type ElevatorQueuePair$Proxy = Subject<ElevatorQueuePair[]>

export const useElevatorQueuePair$Proxy: FnCtor<ElevatorQueuePair$Proxy> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorQueuePair[]>()
}
