import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Use } from '/src/util/resolve'
import { Subject } from 'rxjs'
import { ElevatorPositionPair } from '../..'

type ElevatorPositionPair$Proxy = Subject<ElevatorPositionPair[]>

export const useElevatorPositionPair$Proxy: Use<ElevatorPositionPair$Proxy> = (resolve) => {
  const Subject = resolve(useRxSubject)
  return new Subject<ElevatorPositionPair[]>()
}
