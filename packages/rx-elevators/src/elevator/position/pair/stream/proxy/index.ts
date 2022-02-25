import { FnCtor } from '/src/function/container'
import { useRxSubject } from '/src/pkg/rxjs/Subject'
import { Subject } from 'rxjs'
import { ElevatorPositionPair } from '../..'

type ElevatorPositionPair$Proxy = Subject<ElevatorPositionPair[]>

export const useElevatorPositionPair$Proxy: FnCtor<ElevatorPositionPair$Proxy> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorPositionPair[]>()
}
