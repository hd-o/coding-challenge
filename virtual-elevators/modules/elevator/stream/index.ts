import { Map } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { ElevatorFactory } from '~/elevator/factory'
import { Lodash } from '~/pkg/lodash'
import { Immutable } from '../../pkg/immutable'
import { ISettings } from '../../settings/model'
import { Settings$ } from '../../settings/stream'
import { IElevator, IElevatorRecord } from '../model'

export type IElevator$Map = Map<IElevator['id'], IElevator$>

export type IElevator$ = BehaviorSubject<IElevatorRecord>

@singleton()
export class Elevator$Map$ extends BehaviorSubject<IElevator$Map> {
  constructor (
    @inject(Settings$) readonly settings$: Settings$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(Immutable) readonly immutable: Immutable,
    @inject(ElevatorFactory) readonly elevatorFactory: ElevatorFactory
  ) {
    super(createElevators(settings$.value))
    function createElevators (settings: ISettings): IElevator$Map {
      const elevatorUnit$Array = lodash.rangeMap(settings.elevatorCount, () => {
        const elevator = elevatorFactory.create({ id: lodash.uniqueId() })
        return [elevator.id, new BehaviorSubject(elevator)] as [IElevator['id'], IElevator$]
      })
      return immutable.Map(elevatorUnit$Array)
    }
    combineLatest([settings$]).subscribe((args) => {
      this.next(createElevators(...args))
    })
  }
}

export const Elevator$Ctx = createContext(container.resolve(Elevator$Map$))
