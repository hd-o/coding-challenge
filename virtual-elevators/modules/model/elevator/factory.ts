import { injectable } from 'inversify'
import { Floor } from '~/model/floor'
import { Settings } from '~/model/settings'
import { MobX } from '../mobx'
import { Elevator } from './'

@injectable()
export class ElevatorFactory {
  constructor (
    private readonly _ctx: Settings,
    private readonly _mobx: MobX
  ) {}

  create (floors: Floor[]): Elevator {
    const elevator = new Elevator(floors, this._ctx)
    return this._mobx.makeAutoObservable(elevator)
  }
}
