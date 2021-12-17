import { Settings } from '~/model/settings/index'

/**
 * Building's floor
 */
export class Floor {
  constructor (
    public readonly number: number,
    private readonly _settings: Settings
  ) {
    this.id = String(number)
  }

  public readonly id: string

  get bottomPosition (): number {
    return this.number * this._settings.floorHeight
  }

  get topPosition (): number {
    return this.bottomPosition + this._settings.floorHeight
  }
}
