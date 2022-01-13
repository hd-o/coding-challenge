import { singleton } from 'tsyringe'
import { Immutable } from '~/view/pkg/immutable'
import { MobX } from '~/_model/pkg/mobx'
import { Elevator } from '..'
import { ElevatorHub } from '.'

@singleton()
export class ElevatorHubFactory {
  constructor (
    private readonly _mobx: MobX,
    private readonly _immutable: Immutable) {}

  create (elevators: Elevator[]): ElevatorHub {
    const hub = new ElevatorHub(elevators, this._immutable)
    return this._mobx.makeAutoObservable(hub)
  }
}
