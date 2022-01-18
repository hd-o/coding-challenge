import { Map, RecordOf } from 'immutable'
import { BehaviorSubject } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { IElevatorDoor } from './model'
import { IElevator } from '../model'

type ElevatorDoors = Map<IElevator['id'], RecordOf<IElevatorDoor>>

@singleton()
export class ElevatorDoor$ extends BehaviorSubject<ElevatorDoors> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable
  ) {
    super(immutable.Map())
  }
}
