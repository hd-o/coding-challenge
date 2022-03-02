import { useElevatorCount$ } from '/src/elevator/count/stream'
import { useLodashUniqueId } from '/src/pkg/lodash/uniqueId'
import { useRamdaTimes } from '/src/pkg/ramda/times'
import { useRxMap } from '/src/pkg/rxjs/map'
import { useRxShareReplay } from '/src/pkg/rxjs/shareReplay'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { ElevatorId } from '../'

type ElevatorId$ = Observable<ElevatorId[]>

export const useElevatorId$: Use<ElevatorId$> = (container) => {
  const elevatorCount$ = resolve(container)(useElevatorCount$)
  const map = resolve(container)(useRxMap)
  const shareReplay = resolve(container)(useRxShareReplay)
  const times = resolve(container)(useRamdaTimes)
  const uniqueId = resolve(container)(useLodashUniqueId)

  return elevatorCount$.pipe(
    map(times(() => uniqueId())),
    shareReplay(1),
  )
}
