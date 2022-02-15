import { Observable } from 'rxjs'
import { ElevatorId } from '../'
import { FnC } from '../../../function/container'
import { useLodashUniqueId } from '../../../pkg/lodash/uniqueId'
import { useRamdaTimes } from '../../../pkg/ramda/times'
import { useRxMap } from '../../../pkg/rxjs/map'
import { useRxShareReplay } from '../../../pkg/rxjs/shareReplay'
import { useElevatorCount$ } from '../../count/stream'

export const useElevatorId$ = (container: FnC): Observable<ElevatorId[]> => {
  const elevatorCount$ = container.resolve(useElevatorCount$)
  const map = container.resolve(useRxMap)
  const shareReplay = container.resolve(useRxShareReplay)
  const times = container.resolve(useRamdaTimes)
  const uniqueId = container.resolve(useLodashUniqueId)

  return elevatorCount$.pipe(
    map(times(() => uniqueId())),
    shareReplay(1),
  )
}
