import { List } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { ElevatorFactory } from '~/elevator/factory'
import { Lodash } from '~/pkg/lodash'
import { Elevator$ } from '../elevator/stream'
import { Immutable } from '../pkg/immutable'
import { ISettings } from '../settings/model'
import { Settings$ } from '../settings/stream'

@singleton()
export class Elevators$ extends BehaviorSubject<List<Elevator$>> {
  constructor (
    _: any,
    @inject(Settings$) settings$: Settings$,
    @inject(Lodash) lodash: Lodash,
    @inject(Immutable) immutable: Immutable,
    @inject(ElevatorFactory) elevatorFactory: ElevatorFactory
  ) {
    function createElevators (settings: ISettings): List<Elevator$> {
      const elevators = lodash
        .range(settings.elevatorCount)
        .map(() => {
          const elevator = elevatorFactory.create({
            id: lodash.uniqueId(),
            position: 0
          })
          return new BehaviorSubject(elevator)
        })
      return immutable.List(elevators)
    }
    super(createElevators(settings$.value))
    combineLatest([settings$]).subscribe((args) => this.next(createElevators(...args)))
  }
}

export const Elevators$Ctx = createContext(container.resolve(Elevators$))
