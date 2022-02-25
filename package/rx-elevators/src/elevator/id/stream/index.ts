import { useElevatorCount$ } from '/src/elevator/count/stream'
import { FnC } from '/src/function/container'
import { useLodashUniqueId } from '/src/pkg/lodash/uniqueId'
import { useRamdaTimes } from '/src/pkg/ramda/times'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxShareReplay } from '/src/pkg/rxjs/shareReplay'
import { Observable } from 'rxjs'
import { ElevatorId } from '../'

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
