import { Map } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { Lodash } from '~/pkg/lodash'
import { IElevator } from '../model'
import { Elevator$Map$ } from '../stream'

export type IElevatorPosition$ = BehaviorSubject<number>

export type IElevatorPosition$Map = Map<IElevator['id'], IElevatorPosition$>

@singleton()
export class ElevatorPosition$Map$ extends BehaviorSubject<IElevatorPosition$Map> {
  constructor (
    @inject(Elevator$Map$) readonly elevator$: Elevator$Map$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(Immutable) readonly immutable: Immutable
  ) {
    super(createPosition$())
    elevator$.subscribe(() => this.next(createPosition$()))
    function createPosition$ (): IElevatorPosition$Map {
      return immutable.Map(elevator$.value.valueSeq().map((elevator$) =>
        [elevator$.value.id, new BehaviorSubject(0)]
      ))
    }
  }
}
