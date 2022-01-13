import { List } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { FloorFactory } from '~/floor/factory'
import { Lodash } from '~/pkg/lodash'
import { ISettings } from '~/settings/model'
import { IFloor } from '../floor/model'
import { Immutable } from '../pkg/immutable'
import { Settings$ } from '../settings/stream'

@singleton()
export class Floors$ extends BehaviorSubject<List<IFloor>> {
  constructor (
    _: any,
    @inject(Settings$) settings$: Settings$,
    @inject(Lodash) lodash: Lodash,
    @inject(Immutable) immutable: Immutable,
    @inject(FloorFactory) floorFactory: FloorFactory
  ) {
    function createFloors (settings: ISettings): List<IFloor> {
      const floors = lodash
        .range(settings.floorCount)
        .map(number => floorFactory.create({ number }))
      return immutable.List(floors)
    }
    super(createFloors(settings$.value))
    combineLatest([settings$]).subscribe(args => this.next(createFloors(...args)))
  }
}

export const Floors$Ctx = createContext(container.resolve(Floors$))
