import { Map } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { Lodash } from '~/pkg/lodash'
import { IElevator } from '../model'
import { Elevator$Map$ } from '../stream'

export type IElevatorPositionUnit$ = BehaviorSubject<number>

export type IElevatorPositionUnit$Map = Map<IElevator['id'], IElevatorPositionUnit$>

@singleton()
export class ElevatorPosition$ extends BehaviorSubject<IElevatorPositionUnit$Map> {
  constructor (
    @inject(Elevator$Map$) readonly elevator$: Elevator$Map$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(Immutable) readonly immutable: Immutable
  ) {
    super(createPosition$())
    elevator$.subscribe(() => this.next(createPosition$()))
    function createPosition$ (): IElevatorPositionUnit$Map {
      return immutable.Map(elevator$.value.valueSeq().map((elevatorUnit$) => {
        return [elevatorUnit$.value.id, new BehaviorSubject(0)]
      }))
    }
  }
}
