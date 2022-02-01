import { List, Map } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevator } from '../../model'
import { Elevator$ } from '../../stream'
import { IElevatorUnit$ } from '../../stream/unit'
import { ElevatorQueueFactory } from '../factory'
import { IElevatorQueueUnit$ } from './unit'

type IElevatorQueueUnit$Map = Map<IElevator['id'], IElevatorQueueUnit$>

@singleton()
export class ElevatorQueue$ extends BehaviorSubject<IElevatorQueueUnit$Map> {
  constructor (
    @inject(Elevator$) readonly elevator$: Elevator$,
    @inject(Immutable) readonly immutable: Immutable,
    @inject(ElevatorQueueFactory) readonly elevatorQueueFactory: ElevatorQueueFactory
  ) {
    super(createElevatorQueues(elevator$.value))
    elevator$.subscribe(elevatorUnit$s => this.next(createElevatorQueues(elevatorUnit$s)))
    function createElevatorQueues (elevatorUnit$List: List<IElevatorUnit$>): IElevatorQueueUnit$Map {
      return immutable.Map(elevatorUnit$List.map(elevatorUnit$ => [
        elevatorUnit$.value.id,
        new BehaviorSubject(elevatorQueueFactory.create())
      ]))
    }
  }
}

export const ElevatorQueue$Ctx = createContext(container.resolve(ElevatorQueue$))
