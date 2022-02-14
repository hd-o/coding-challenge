import { Observable } from 'rxjs'
import { FloorNumber } from '../'
import { FnC } from '../../../function/container'
import { useRamdaIdentity } from '../../../pkg/ramda/identity'
import { useRamdaTimes } from '../../../pkg/ramda/times'
import { useRxMap } from '../../../pkg/rxjs/map'
import { useFloorCount$ } from '../../count'

export const useFloorNumber$ = (container: FnC): Observable<FloorNumber[]> => {
  const identity = container.resolve(useRamdaIdentity)
  const map = container.resolve(useRxMap)
  const times = container.resolve(useRamdaTimes)
  const floorCount$ = container.resolve(useFloorCount$)

  return floorCount$.pipe(
    map(times(identity))
  )
}
