import { Map } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { Lodash } from '~/pkg/lodash'
import { IElevator } from '../model'
import { Elevator$ } from '../stream'

export type ElevatorPositionUnit$ = BehaviorSubject<number>
export type ElevatorPositionUnit$Map = Map<IElevator['id'], ElevatorPositionUnit$>

@singleton()
export class ElevatorPosition$ extends BehaviorSubject<ElevatorPositionUnit$Map> {
  constructor (
    @inject(Elevator$) readonly elevator$: Elevator$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(Immutable) readonly immutable: Immutable
  ) {
    super(createPosition$())
    elevator$.subscribe(() => this.next(createPosition$()))
    function createPosition$ (): ElevatorPositionUnit$Map {
      return immutable.Map(elevator$.value.map((elevatorUnit$) => {
        return [elevatorUnit$.value.id, new BehaviorSubject(0)]
      }))
    }
  }
}
