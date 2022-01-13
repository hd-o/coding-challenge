import { singleton } from 'tsyringe'
import { Settings } from '~/_model/settings'
import { Floor } from '.'

@singleton()
export class FloorFactory {
  constructor (private readonly _settings: Settings) {}

  create (number: number): Floor {
    return new Floor(number, this._settings)
  }
}
