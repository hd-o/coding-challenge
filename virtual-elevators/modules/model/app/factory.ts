import { injectable } from 'inversify'
import { ElevatorFactory } from '~/model/elevator/factory'
import { ElevatorHubFactory } from '~/model/elevator/hub/factory'
import { FloorFactory } from '~/model/floor/factory'
import { MobX } from '../mobx'
import { App } from './'

@injectable()
export class AppFactory {
  constructor (
    private readonly _elevatorFactory: ElevatorFactory,
    private readonly _elevatorControllerFactory: ElevatorHubFactory,
    private readonly _floorFactory: FloorFactory,
    private readonly _mobx: MobX
  ) {}

  create (): App {
    const floors = [
      this._floorFactory.create(1),
      this._floorFactory.create(2),
      this._floorFactory.create(3)
    ]
    const elevators = [
      this._elevatorFactory.create(floors),
      this._elevatorFactory.create(floors),
      this._elevatorFactory.create(floors)
    ]
    const elevatorCtrl = this._elevatorControllerFactory.create(elevators)
    return this._mobx.makeAutoObservable(new App(elevatorCtrl))
  }
}
