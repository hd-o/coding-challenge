import { injectable } from 'tsyringe'
import { ElevatorFactory } from '~/model/elevator/factory'
import { ElevatorHubFactory } from '~/model/elevator/hub/factory'
import { FloorFactory } from '~/model/floor/factory'
import { Lodash } from '../pkg/lodash'
import { MobX } from '../pkg/mobx'
import { Settings } from '../settings'
import { App } from './'

@injectable()
export class AppFactory {
  constructor (
    private readonly _elevatorFactory: ElevatorFactory,
    private readonly _elevatorControllerFactory: ElevatorHubFactory,
    private readonly _floorFactory: FloorFactory,
    private readonly _lodash: Lodash,
    private readonly _mobx: MobX,
    private readonly _settings: Settings
  ) {}

  create (): App {
    const floors = this._lodash
      .range(this._settings.floorCount)
      .map(index => this._floorFactory.create(index))
    const elevators = this._lodash
      .range(this._settings.elevatorCount)
      .map(() => this._elevatorFactory.create(floors))
    const elevatorHub = this._elevatorControllerFactory.create(elevators)
    const app = new App(elevatorHub, floors, this._settings)
    return this._mobx.makeAutoObservable(app)
  }
}
