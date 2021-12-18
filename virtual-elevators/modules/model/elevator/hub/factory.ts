import { singleton } from 'tsyringe'
import { MobX } from '~/model/pkg/mobx'
import { Elevator } from '../'
import { ElevatorHub } from './'

@singleton()
export class ElevatorHubFactory {
  constructor (private readonly _mobx: MobX) {}

  create (elevators: Elevator[]): ElevatorHub {
    return this._mobx.makeAutoObservable(new ElevatorHub(elevators))
  }
}
