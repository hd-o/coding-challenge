import { List, Map, RecordOf } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevator } from '../model'
import { Elevator$ } from '../stream'
import { ElevatorUnit$ } from '../stream/unit'
import { ElevatorDoorFactory } from './factory'
import { IElevatorDoor } from './model'

export type ElevatorDoorUnit$ = BehaviorSubject<RecordOf<IElevatorDoor>>
type ElevatorDoorMap = Map<IElevator, ElevatorDoorUnit$>

@singleton()
export class ElevatorDoor$ extends BehaviorSubject<ElevatorDoorMap> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    @inject(Elevator$) readonly elevator$: Elevator$,
    @inject(ElevatorDoorFactory) readonly doorFactory: ElevatorDoorFactory
  ) {
    super(createDoorMap(elevator$.value))
    elevator$.subscribe((elevatorUnit$s) => this.next(createDoorMap(elevatorUnit$s)))
    function createDoorMap (elevatorUnit$s: List<ElevatorUnit$>): ElevatorDoorMap {
      return immutable.Map(elevatorUnit$s.map(elevatorUnit$ => ([
        elevatorUnit$.value,
        new BehaviorSubject(doorFactory.create())
      ])))
    }
  }
}
