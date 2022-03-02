import { useFloorCount$ } from '/src/floor/count'
import { useRamdaIdentity } from '/src/pkg/ramda/identity'
import { useRamdaTimes } from '/src/pkg/ramda/times'
import { useRxMap } from '/src/pkg/rxjs/map'
import { Use } from '/src/util/resolve'
import { Observable } from 'rxjs'
import { FloorNumber } from '../'

type FloorNumber$ = Observable<FloorNumber[]>

export const useFloorNumber$: Use<FloorNumber$> = (resolve) => {
  const identity = resolve(useRamdaIdentity)
  const map = resolve(useRxMap)
  const times = resolve(useRamdaTimes)
  const floorCount$ = resolve(useFloorCount$)

  return floorCount$.pipe(
    map(times(identity))
  )
}
