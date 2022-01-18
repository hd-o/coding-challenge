import { Map } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { Lodash } from '~/pkg/lodash'
import { IElevator } from '../model'
import { Elevator$ } from '../stream'

type PositionUnit$ = BehaviorSubject<number>
type Position$ = Map<IElevator['id'], PositionUnit$>

@singleton()
export class ElevatorPosition$ extends BehaviorSubject<Position$> {
  constructor (
    @inject(Elevator$) readonly elevator$: Elevator$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(Immutable) readonly immutable: Immutable
  ) {
    super(createPosition$())
    elevator$.subscribe(() => this.next(createPosition$()))
    function createPosition$ (): Position$ {
      return immutable.Map(elevator$.value.map((elevatorUnit$) => {
        return [elevatorUnit$.value.id, new BehaviorSubject(0)] as [string, PositionUnit$]
      }))
    }
  }
}
