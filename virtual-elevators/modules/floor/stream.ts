import { List } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { FloorFactory } from '~/floor/factory'
import { Lodash } from '~/pkg/lodash'
import { ISettings } from '~/settings/model'
import { Immutable } from '../pkg/immutable'
import { Settings$ } from '../settings/stream'
import { IFloorRecord } from './model'

@singleton()
export class Floor$ extends BehaviorSubject<List<IFloorRecord>> {
  constructor (
    @inject(Settings$) readonly settings$: Settings$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(Immutable) readonly immutable: Immutable,
    @inject(FloorFactory) readonly floorFactory: FloorFactory
  ) {
    super(createFloors(settings$.value))
    function createFloors (settings: ISettings): List<IFloorRecord> {
      const floors = lodash
        .range(settings.floorCount)
        .map(number => floorFactory.create({ number }))
      return immutable.List(floors)
    }
    combineLatest([settings$]).subscribe(args => this.next(createFloors(...args)))
  }
}

export const Floor$Ctx = createContext(container.resolve(Floor$))
