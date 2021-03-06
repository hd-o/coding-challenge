import { FloorFactory } from '/src/floor/factory'
import { Lodash } from '/src/pkg/lodash'
import { List } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
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

export const useFloorList$ = (): FloorList$ => container.resolve(FloorList$)
