import { Lodash } from '/src/pkg/lodash'
import { Settings$ } from '/src/settings/stream'
import { MemoizedFunction } from 'lodash'
import { container, inject, singleton } from 'tsyringe'
import { IFloorRecord } from './model'
import { FloorRequest$, IFloorRequest$ } from './requests/stream'
import { FloorList$ } from './stream'

type GetPosition = (floor: IFloorRecord) => number

@singleton()
export class FloorCtrl {
  constructor (
    @inject(FloorList$) readonly floor$: FloorList$,
    @inject(Settings$) readonly settings$: Settings$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(FloorRequest$) private readonly _floorRequest$: FloorRequest$
  ) {
    this.getPosition = lodash.memoize((floor: IFloorRecord): number => {
      return floor.number * settings$.value.floorHeight
    })
    this.getTopPosition = lodash.memoize((floor: IFloorRecord): number => {
      return this.getPosition(floor) + settings$.value.floorHeight
    })
    floor$.subscribe(() => {
      this.getPosition.cache.clear?.()
      this.getTopPosition.cache.clear?.()
    })
  }

  readonly getPosition: MemoizedFunction & GetPosition

  readonly getTopPosition: MemoizedFunction & GetPosition

  getRequest$ (floor: IFloorRecord): IFloorRequest$ {
    return this._floorRequest$.value.get(floor) as IFloorRequest$
  }

  hasRequestedElevator (floor: IFloorRecord): boolean {
    return this._floorRequest$.value.get(floor)?.value === true
  }

  setHasRequestedElevator (floor: IFloorRecord, hasRequested: boolean): void {
    this._floorRequest$.value.get(floor)?.next(hasRequested)
  }
}

export const useFloorCtrl = (): FloorCtrl => container.resolve(FloorCtrl)
