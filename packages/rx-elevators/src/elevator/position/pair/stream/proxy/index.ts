
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { resolve, Use } from '/src/util/resolve'
import { Subject } from 'rxjs'
import { ElevatorPositionPair } from '../..'

type ElevatorPositionPair$Proxy = Subject<ElevatorPositionPair[]>

export const useElevatorPositionPair$Proxy: Use<ElevatorPositionPair$Proxy> = (container) => {
  const Subject = resolve(container)(useRxSubject)
  return new Subject<ElevatorPositionPair[]>()
}
