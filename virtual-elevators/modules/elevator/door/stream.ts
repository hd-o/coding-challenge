import { Map, RecordOf } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevator } from '../model'
import { Elevator$Map$, IElevator$Map } from '../stream'
import { ElevatorDoorFactory } from './factory'
import { IElevatorDoor } from './model'

// TODO: use IElevatorDoorRecord
type IElevatorDoorRecord = RecordOf<IElevatorDoor>

export type IElevatorDoor$ = BehaviorSubject<IElevatorDoorRecord>

type IElevatorDoor$Map = Map<IElevator['id'], IElevatorDoor$>

@singleton()
export class ElevatorDoor$Map$ extends BehaviorSubject<IElevatorDoor$Map> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    @inject(Elevator$Map$) readonly elevator$Map$: Elevator$Map$,
    @inject(ElevatorDoorFactory) readonly doorFactory: ElevatorDoorFactory
  ) {
    super(createDoorMap(elevator$Map$.value))
    elevator$Map$.subscribe((elevator$Map) => this.next(createDoorMap(elevator$Map)))
    function createDoorMap (elevator$Map: IElevator$Map): IElevatorDoor$Map {
      return immutable.Map(elevator$Map.valueSeq().map(elevator$ => ([
        elevator$.value.id,
        new BehaviorSubject(doorFactory.create())
      ])))
    }
  }
}
