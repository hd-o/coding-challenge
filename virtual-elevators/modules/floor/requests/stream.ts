import { List, Map } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IFloorRecord } from '../model'
import { FloorList$ } from '../stream'

type IFloorRequested = true | false

export type IFloorRequest$ = BehaviorSubject<IFloorRequested>

type IFloorRequestMap = Map<IFloorRecord, IFloorRequest$>

@singleton()
export class FloorRequest$ extends BehaviorSubject<IFloorRequestMap> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    @inject(FloorList$) readonly floor$: FloorList$
  ) {
    super(createFloorRequestMap(floor$.value))
    floor$.subscribe(floor => this.next(createFloorRequestMap(floor)))
    function createFloorRequestMap (floors: List<IFloorRecord>): IFloorRequestMap {
      return immutable.Map(floors.map((floor) => {
        return [floor, new BehaviorSubject(false)] as [IFloorRecord, IFloorRequest$]
      }))
    }
  }
}

export const FloorRequest$Ctx = createContext(container.resolve(FloorRequest$))
