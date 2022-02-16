import { useFloorCount$ } from '/src/floor/count'
import { FnC } from '/src/function/container'
import { useRamdaIdentity } from '/src/pkg/ramda/identity'
import { useRamdaTimes } from '/src/pkg/ramda/times'
import { useRxMap } from '/src/pkg/rxjs/map'
import { Observable } from 'rxjs'
import { FloorNumber } from '../'

export const useFloorNumber$ = (container: FnC): Observable<FloorNumber[]> => {
  const identity = container.resolve(useRamdaIdentity)
  const map = container.resolve(useRxMap)
  const times = container.resolve(useRamdaTimes)
  const floorCount$ = container.resolve(useFloorCount$)

  return floorCount$.pipe(
    map(times(identity))
  )
}
