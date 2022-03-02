import { useElevatorCount$ } from '/src/elevator/count/stream'
import { useLodashUniqueId } from '/src/pkg/lodash/uniqueId'
import { useRamdaTimes } from '/src/pkg/ramda/times'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxShareReplay } from '/src/pkg/rxjs/shareReplay'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorId } from '../'

type ElevatorId$ = Observable<ElevatorId[]>

export const useElevatorId$: Use<ElevatorId$> = (resolve) => {
  const elevatorCount$ = resolve(useElevatorCount$)
  const map = resolve(useRxMap)
  const shareReplay = resolve(useRxShareReplay)
  const times = resolve(useRamdaTimes)
  const uniqueId = resolve(useLodashUniqueId)

  return elevatorCount$.pipe(
    map(times(() => uniqueId())),
    shareReplay(1),
  )
}
