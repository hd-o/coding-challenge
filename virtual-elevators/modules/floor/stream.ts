import { List } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { FloorFactory } from '~/floor/factory'
import { Lodash } from '~/pkg/lodash'
import { Immutable } from '../pkg/immutable'
import { Settings$ } from '../settings/stream'
import { IFloorRecord } from './model'

type IFloorRecordList = List<IFloorRecord>

@singleton()
export class FloorList$ extends BehaviorSubject<IFloorRecordList> {
  constructor (
    @inject(Settings$) readonly settings$: Settings$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(Immutable) readonly immutable: Immutable,
    @inject(FloorFactory) readonly floorFactory: FloorFactory
  ) {
    super(createFloors())
    settings$.subscribe(() => this.next(createFloors()))
    function createFloors (): IFloorRecordList {
      const floors = lodash
        .range(settings$.value.floorCount)
        .map(number => floorFactory.create({ number }))
      return immutable.List(floors)
    }
  }
}

export const FloorList$Ctx = createContext(container.resolve(FloorList$))
