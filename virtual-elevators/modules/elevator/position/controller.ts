import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { FloorCtrl } from '~/floor/controller'
import { IFloor } from '~/floor/model'
import { Settings$ } from '~/settings/stream'
import { IElevator } from '../model'
import { ElevatorPosition$ } from './stream'

@singleton()
export class ElevatorPositionCtrl {
  constructor (
    @inject(ElevatorPosition$) private readonly _elevatorPosition$: ElevatorPosition$,
    @inject(Settings$) private readonly _settings$: Settings$,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl
  ) { }

  getPosition (elevator: IElevator): number {
    return this._elevatorPosition$.value.get(elevator)?.value as number
  }

  getTopPosition (elevator: IElevator): number {
    return this.getPosition(elevator) + this._settings$.value.floorHeight
  }

  isAtFloor (elevator: IElevator, floor: IFloor): boolean {
    return this.getPosition(elevator) === this._floorCtrl.getPosition(floor)
  }

  isOverFloor (elevator: IElevator, floor: IFloor): boolean {
    return this.getPosition(elevator) > this._floorCtrl.getPosition(floor)
  }
}

export const ElevatorPositionCtrlCtx = createContext(container.resolve(ElevatorPositionCtrl))
