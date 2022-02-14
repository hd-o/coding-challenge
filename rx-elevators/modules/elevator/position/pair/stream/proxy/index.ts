import { Subject } from 'rxjs'
import { ElevatorPositionPair } from '../..'
import { FnCtor } from '../../../../../function/container'
import { useRxSubject } from '../../../../../pkg/rxjs/Subject'

type ElevatorPositionPair$Proxy = Subject<ElevatorPositionPair[]>

export const useElevatorPositionPair$Proxy: FnCtor<ElevatorPositionPair$Proxy> = (container) => {
  const Subject = container.resolve(useRxSubject)
  return new Subject<ElevatorPositionPair[]>()
}
