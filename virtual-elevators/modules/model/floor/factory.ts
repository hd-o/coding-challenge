import { injectable } from 'inversify'
import { Settings } from '~/model/settings'
import { Floor } from './'

@injectable()
export class FloorFactory {
  constructor (private readonly _settings: Settings) {}

  create (number: number): Floor {
    return new Floor(number, this._settings)
  }
}
