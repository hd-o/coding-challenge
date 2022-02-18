import { Map, RecordOf } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '/src/pkg/immutable'
import { IElevator } from '../model'
import { Elevator$Map$ } from '../stream'
import { ElevatorQueueFactory } from './factory'
import { IElevatorQueue } from './model'

export type IElevatorQueueRecord = RecordOf<IElevatorQueue>

export type IElevatorQueue$ = BehaviorSubject<IElevatorQueueRecord>

type IElevatorQueue$Map = Map<IElevator['id'], IElevatorQueue$>

@singleton()
export class ElevatorQueue$Map$ extends BehaviorSubject<IElevatorQueue$Map> {
  constructor (
    @inject(Elevator$Map$) readonly elevator$Map$: Elevator$Map$,
    @inject(Immutable) readonly immutable: Immutable,
    @inject(ElevatorQueueFactory) readonly elevatorQueueFactory: ElevatorQueueFactory
  ) {
    super(createElevatorQueues())
    elevator$Map$.subscribe(() => this.next(createElevatorQueues()))
    function createElevatorQueues (): IElevatorQueue$Map {
      return immutable.Map(elevator$Map$.value.valueSeq().map(elevator$ =>
        [elevator$.value.id, new BehaviorSubject(elevatorQueueFactory.create())]
      ))
    }
  }
}

export const ElevatorQueue$Ctx = createContext(container.resolve(ElevatorQueue$Map$))
