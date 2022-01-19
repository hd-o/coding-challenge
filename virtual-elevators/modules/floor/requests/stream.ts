import { List, Map } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IFloor } from '../model'
import { Floor$ } from '../stream'

type HasRequestedElevator = boolean
type HasFloorRequestedElevator$ = BehaviorSubject<HasRequestedElevator>
type FloorRequestMap = Map<IFloor, HasFloorRequestedElevator$>

@singleton()
export class FloorRequest$ extends BehaviorSubject<FloorRequestMap> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    @inject(Floor$) readonly floor$: Floor$
  ) {
    super(createFloorRequestMap(floor$.value))
    floor$.subscribe(floor => this.next(createFloorRequestMap(floor)))
    function createFloorRequestMap (floors: List<IFloor>): FloorRequestMap {
      return immutable.Map(floors.map((floor) => {
        return [floor, new BehaviorSubject(false)] as [IFloor, HasFloorRequestedElevator$]
      }))
    }
  }
}
