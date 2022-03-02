
import { useFloorCount$ } from '/src/floor/count'
import { useRamdaIdentity } from '/src/pkg/ramda/identity'
import { useRamdaTimes } from '/src/pkg/ramda/times'
import { useRxMap } from '/src/pkg/rxjs/map'
import { resolve, Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { FloorNumber } from '../'

type FloorNumber$ = Observable<FloorNumber[]>

export const useFloorNumber$: Use<FloorNumber$> = (container) => {
  const identity = resolve(container)(useRamdaIdentity)
  const map = resolve(container)(useRxMap)
  const times = resolve(container)(useRamdaTimes)
  const floorCount$ = resolve(container)(useFloorCount$)

  return floorCount$.pipe(
    map(times(identity))
  )
}
