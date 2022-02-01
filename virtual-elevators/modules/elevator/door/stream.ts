import { List, Map, RecordOf } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevator } from '../model'
import { Elevator$ } from '../stream'
import { IElevatorUnit$ } from '../stream/unit'
import { ElevatorDoorFactory } from './factory'
import { IElevatorDoor } from './model'

export type IElevatorDoorUnit$ = BehaviorSubject<RecordOf<IElevatorDoor>>

type IElevatorDoorMap = Map<IElevator['id'], IElevatorDoorUnit$>

@singleton()
export class ElevatorDoor$ extends BehaviorSubject<IElevatorDoorMap> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    @inject(Elevator$) readonly elevator$: Elevator$,
    @inject(ElevatorDoorFactory) readonly doorFactory: ElevatorDoorFactory
  ) {
    super(createDoorMap(elevator$.value))
    elevator$.subscribe((elevatorUnit$s) => this.next(createDoorMap(elevatorUnit$s)))
    function createDoorMap (elevatorUnit$s: List<IElevatorUnit$>): IElevatorDoorMap {
      return immutable.Map(elevatorUnit$s.map(elevatorUnit$ => ([
        elevatorUnit$.value.id,
        new BehaviorSubject(doorFactory.create())
      ])))
    }
  }
}
