import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/resolve'
import { Subject } from 'rxjs'
import { ElevatorQueuePair } from '../..'

type ElevatorQueuePair$Proxy = Subject<ElevatorQueuePair[]>

export const useElevatorQueuePair$Proxy: Use<ElevatorQueuePair$Proxy> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<ElevatorQueuePair[]>()
}
