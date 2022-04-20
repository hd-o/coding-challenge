import { FloorCtrl } from '/src/floor/controller'
import { IFloorRecord } from '/src/floor/model'
import { Settings$ } from '/src/settings/stream'
import { container, inject, singleton } from 'tsyringe'
import { IElevatorRecord } from '../model'
import { ElevatorPosition$Map$, IElevatorPosition$ } from './stream'

@singleton()
export class ElevatorPositionCtrl {
  constructor (
    @inject(ElevatorPosition$Map$) private readonly _elevatorPosition$: ElevatorPosition$Map$,
    @inject(Settings$) private readonly _settings$: Settings$,
    @inject(FloorCtrl) private readonly _floorCtrl: FloorCtrl
  ) { }

  getPosition (elevator: IElevatorRecord): number {
    return this.getPosition$(elevator).value
  }

  getPosition$ (elevator: IElevatorRecord): IElevatorPosition$ {
    return this._elevatorPosition$.value.get(elevator.id) as IElevatorPosition$
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
    const position$ = this.getPosition$(elevator)
    position$.next(position)
  }
}

export const useElevatorPositionCtrl =
  (): ElevatorPositionCtrl => container.resolve(ElevatorPositionCtrl)
