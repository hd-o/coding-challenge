import { Observable } from 'rxjs'
import { ElevatorId } from '../'
import { FnC } from '../../../function/container'
import { useLodashUniqueId } from '../../../pkg/lodash/uniqueId'
import { useRamdaMemoizeWith } from '../../../pkg/ramda/memoizeWith'
import { useRamdaTimes } from '../../../pkg/ramda/times'
import { useRxMap } from '../../../pkg/rxjs/map'
import { useElevatorCount$ } from '../../count/stream'

export const useElevatorId$ = (container: FnC): Observable<ElevatorId[]> => {
  const map = container.resolve(useRxMap)
  const memoizeWith = container.resolve(useRamdaMemoizeWith)
  const times = container.resolve(useRamdaTimes)
  const uniqueId = container.resolve(useLodashUniqueId)
  const elevatorCount$ = container.resolve(useElevatorCount$)

  const mapCountToIds = memoizeWith(
    String,
    (count: number): ElevatorId[] => times(() => uniqueId(), count),
  )

  return elevatorCount$.pipe(map(mapCountToIds))
}
