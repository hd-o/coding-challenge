import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { FloorCtrl } from '~/floor/controller'
import { IFloorRecord } from '~/floor/model'
import { Settings$ } from '~/settings/stream'
import { IElevatorRecord } from '../model'
import { ElevatorPosition$, IElevatorPositionUnit$ } from './stream'

@singleton()
export class ElevatorPositionCtrl {
  constructor (
    @inject(ElevatorPosition$) private readonly _elevatorPosition$: ElevatorPosition$,
    @inject(Settings$) private readonly _settings$: Settings$,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl
  ) { }

  getPosition (elevator: IElevatorRecord): number {
    return this.getPositionUnit$(elevator).value
  }

  getPositionUnit$ (elevator: IElevatorRecord): IElevatorPositionUnit$ {
    return this._elevatorPosition$.value.get(elevator.id) as IElevatorPositionUnit$
  }

  getTopPosition (elevator: IElevatorRecord): number {
    return this.getPosition(elevator) + this._settings$.value.floorHeight
  }

  isAtFloor (elevator: IElevatorRecord, floor: IFloorRecord): boolean {
    return this.getPosition(elevator) === this._floorCtrl.getPosition(floor)
  }

  isOverFloor (elevator: IElevatorRecord, floor: IFloorRecord): boolean {
    return this.getPosition(elevator) > this._floorCtrl.getPosition(floor)
  }

  setPosition (elevator: IElevatorRecord, position: number): void {
    const positionUnit$ = this.getPositionUnit$(elevator)
    positionUnit$.next(position)
  }
}

export const ElevatorPositionCtrlCtx = createContext(container.resolve(ElevatorPositionCtrl))
