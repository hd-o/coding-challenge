import { List, Map } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IFloor } from '../model'
import { Floor$ } from '../stream'

type FloorRequest = boolean
export type FloorRequestUnit$ = BehaviorSubject<FloorRequest>
type FloorRequestMap = Map<IFloor, FloorRequestUnit$>

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
        return [floor, new BehaviorSubject(false)] as [IFloor, FloorRequestUnit$]
      }))
    }
  }
}

export const FloorRequest$Ctx = createContext(container.resolve(FloorRequest$))
