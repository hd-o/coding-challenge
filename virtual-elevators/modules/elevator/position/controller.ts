import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { FloorCtrl } from '~/floor/controller'
import { IFloor } from '~/floor/model'
import { Settings$ } from '~/settings/stream'
import { ElevatorRecord } from '../model'
import { ElevatorPosition$, ElevatorPositionUnit$ } from './stream'

@singleton()
export class ElevatorPositionCtrl {
  constructor (
    @inject(ElevatorPosition$) private readonly _elevatorPosition$: ElevatorPosition$,
    @inject(Settings$) private readonly _settings$: Settings$,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl
  ) { }

  getPosition (elevator: ElevatorRecord): number {
    return this.getPositionUnit$(elevator).value
  }

  getPositionUnit$ (elevator: ElevatorRecord): ElevatorPositionUnit$ {
    return this._elevatorPosition$.value.get(elevator.id) as ElevatorPositionUnit$
  }

  getTopPosition (elevator: ElevatorRecord): number {
    return this.getPosition(elevator) + this._settings$.value.floorHeight
  }

  isAtFloor (elevator: ElevatorRecord, floor: IFloor): boolean {
    return this.getPosition(elevator) === this._floorCtrl.getPosition(floor)
  }

  isOverFloor (elevator: ElevatorRecord, floor: IFloor): boolean {
    return this.getPosition(elevator) > this._floorCtrl.getPosition(floor)
  }

  setPosition (elevator: ElevatorRecord, position: number): void {
    const positionUnit$ = this.getPositionUnit$(elevator)
    positionUnit$.next(position)
  }
}

export const ElevatorPositionCtrlCtx = createContext(container.resolve(ElevatorPositionCtrl))
