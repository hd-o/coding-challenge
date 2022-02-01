import { Map } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevator } from '../model'
import { Elevator$Map$ } from '../stream'
import { ElevatorDoorFactory } from './factory'
import { IElevatorDoorRecord } from './model'

export type IElevatorDoor$ = BehaviorSubject<IElevatorDoorRecord>

type IElevatorDoor$Map = Map<IElevator['id'], IElevatorDoor$>

@singleton()
export class ElevatorDoor$Map$ extends BehaviorSubject<IElevatorDoor$Map> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    @inject(Elevator$Map$) readonly elevator$Map$: Elevator$Map$,
    @inject(ElevatorDoorFactory) readonly doorFactory: ElevatorDoorFactory
  ) {
    super(createDoorMap())
    elevator$Map$.subscribe(() => this.next(createDoorMap()))
    function createDoorMap (): IElevatorDoor$Map {
      const elevator$Seq = elevator$Map$.value.valueSeq()
      return immutable.Map(elevator$Seq.map(elevator$ => [
        elevator$.value.id,
        new BehaviorSubject(doorFactory.create())
      ]))
    }
  }
}
