import { List, Map } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IFloorRecord } from '../model'
import { Floor$ } from '../stream'

type IFloorRequest = boolean

export type IFloorRequestUnit$ = BehaviorSubject<IFloorRequest>

type IFloorRequestMap = Map<IFloorRecord, IFloorRequestUnit$>

@singleton()
export class FloorRequest$ extends BehaviorSubject<IFloorRequestMap> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    @inject(Floor$) readonly floor$: Floor$
  ) {
    super(createFloorRequestMap(floor$.value))
    floor$.subscribe(floor => this.next(createFloorRequestMap(floor)))
    function createFloorRequestMap (floors: List<IFloorRecord>): IFloorRequestMap {
      return immutable.Map(floors.map((floor) => {
        return [floor, new BehaviorSubject(false)] as [IFloorRecord, IFloorRequestUnit$]
      }))
    }
  }
}

export const FloorRequest$Ctx = createContext(container.resolve(FloorRequest$))
