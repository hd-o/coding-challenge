import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { resolve, Use } from '/src/util/resolve'
import { Subject } from 'rxjs'
import { ElevatorQueuePair } from '../..'

type ElevatorQueuePair$Proxy = Subject<ElevatorQueuePair[]>

export const useElevatorQueuePair$Proxy: Use<ElevatorQueuePair$Proxy> = (container) => {
  const Subject = resolve(container)(useRxSubject)
  return new Subject<ElevatorQueuePair[]>()
}
