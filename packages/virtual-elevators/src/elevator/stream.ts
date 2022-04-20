import { ElevatorFactory } from '/src/elevator/factory'
import { Lodash } from '/src/pkg/lodash'
import { Map } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '../pkg/immutable'
import { Settings$ } from '../settings/stream'
import { IElevator, IElevatorRecord } from './model'

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
    super(createElevators())
    settings$.subscribe(() => this.next(createElevators()))
    function createElevators (): IElevator$Map {
      return immutable.Map(lodash.rangeMap(settings$.value.elevatorCount, () => {
        const elevator = elevatorFactory.create({ id: lodash.uniqueId() })
        return [elevator.id, new BehaviorSubject(elevator)] as [IElevator['id'], IElevator$]
      }))
    }
  }
}

export const useElevator$ = (): Elevator$Map$ => container.resolve(Elevator$Map$)
