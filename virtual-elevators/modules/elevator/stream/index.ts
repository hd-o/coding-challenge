import { List } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { ElevatorFactory } from '~/elevator/factory'
import { Lodash } from '~/pkg/lodash'
import { Immutable } from '../../pkg/immutable'
import { ISettings } from '../../settings/model'
import { Settings$ } from '../../settings/stream'
import { IElevatorUnit$ } from './unit'

export type IElevatorUnit$List = List<IElevatorUnit$>

@singleton()
export class Elevator$ extends BehaviorSubject<IElevatorUnit$List> {
  constructor (
    @inject(Settings$) readonly settings$: Settings$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(Immutable) readonly immutable: Immutable,
    @inject(ElevatorFactory) readonly elevatorFactory: ElevatorFactory
  ) {
    super(createElevators(settings$.value))
    function createElevators (settings: ISettings): List<IElevatorUnit$> {
      const elevatorUnit$Array = lodash.rangeMap(settings.elevatorCount, () => {
        const elevator = elevatorFactory.create({ id: lodash.uniqueId() })
        return new BehaviorSubject(elevator)
      })
      return immutable.List(elevatorUnit$Array)
    }
    combineLatest([settings$]).subscribe((args) => {
      this.next(createElevators(...args))
    })
  }
}

export const Elevator$Ctx = createContext(container.resolve(Elevator$))
