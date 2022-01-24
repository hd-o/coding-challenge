import { List, Map } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevator } from '../../model'
import { Elevator$ } from '../../stream'
import { ElevatorUnit$ } from '../../stream/unit'
import { ElevatorQueueFactory } from '../factory'
import { IElevatorQueueUnit$ } from './unit'

type ElevatorQueueUnit$Map = Map<IElevator, IElevatorQueueUnit$>

@singleton()
export class ElevatorQueue$ extends BehaviorSubject<ElevatorQueueUnit$Map> {
  constructor (
    @inject(Elevator$) readonly elevator$: Elevator$,
    @inject(Immutable) readonly immutable: Immutable,
    @inject(ElevatorQueueFactory) readonly elevatorQueueFactory: ElevatorQueueFactory
  ) {
    super(createElevatorQueues(elevator$.value))
    function createElevatorQueues (elevatorUnit$s: List<ElevatorUnit$>): ElevatorQueueUnit$Map {
      return immutable.Map(elevatorUnit$s.map(elevator => [
        elevator.value,
        new BehaviorSubject(elevatorQueueFactory.create())
      ]))
    }
    elevator$.subscribe(elevatorUnit$s => {
      this.next(createElevatorQueues(elevatorUnit$s))
    })
  }
}

export const ElevatorQueue$Ctx = createContext(container.resolve(ElevatorQueue$))
