import { injectable } from 'inversify'
import { MobX } from '~/model/mobx'
import { Elevator } from '../'
import { ElevatorHub } from './'

@injectable()
export class ElevatorHubFactory {
  constructor (private readonly _mobx: MobX) {}

  create (elevators: Elevator[]): ElevatorHub {
    return this._mobx.makeAutoObservable(new ElevatorHub(elevators))
  }
}
