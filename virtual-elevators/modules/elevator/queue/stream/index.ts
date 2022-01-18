import { List, Map } from 'immutable'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevator } from '../../model'
import { Elevator$ } from '../../stream'
import { ElevatorUnit$ } from '../../stream/unit'
import { ElevatorQueueFactory } from '../factory'
import { IElevatorQueueUnit$ } from './unit'

type ElevatorQueueUnit$Map = Map<IElevator['id'], IElevatorQueueUnit$>

@singleton()
export class ElevatorQueue$ extends BehaviorSubject<ElevatorQueueUnit$Map> {
  constructor (
    @inject(Elevator$) readonly elevator$: Elevator$,
    @inject(Immutable) readonly immutable: Immutable,
    @inject(ElevatorQueueFactory) readonly elevatorQueueFactory: ElevatorQueueFactory
  ) {
    super(createElevatorQueues(elevator$.value))
    function createElevatorQueues (elevators: List<ElevatorUnit$>): ElevatorQueueUnit$Map {
      return immutable.Map(elevators.map(elevator => [
        elevator.value.id,
        new BehaviorSubject(elevatorQueueFactory.create())
      ]))
    }
    combineLatest([elevator$]).subscribe(args => this.next(createElevatorQueues(...args)))
  }
}
