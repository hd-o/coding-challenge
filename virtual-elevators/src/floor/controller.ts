import { Lodash } from '/src/pkg/lodash'
import { Settings$ } from '/src/settings/stream'
import { MemoizedFunction } from 'lodash'
import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { IFloorRecord } from './model'
import { FloorRequest$, IFloorRequest$ } from './requests/stream'
import { FloorList$ } from './stream'

type IGetPosition = (floor: IFloorRecord) => number

@singleton()
export class FloorCtrl {
  private readonly _getPosition: MemoizedFunction & IGetPosition

  private readonly _getTopPosition: MemoizedFunction & IGetPosition

  constructor (
    @inject(FloorList$) readonly floor$: FloorList$,
    @inject(Settings$) readonly settings$: Settings$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(FloorRequest$) private readonly _floorRequest$: FloorRequest$
  ) {
    this._getPosition = lodash.memoize((floor: IFloorRecord): number => {
      return floor.number * settings$.value.floorHeight
    })
    this._getTopPosition = lodash.memoize((floor: IFloorRecord): number => {
      return this.getPosition(floor) + settings$.value.floorHeight
    })
    floor$.subscribe(() => {
      this._getPosition.cache.clear?.()
      this._getTopPosition.cache.clear?.()
    })
  }

  getPosition: IGetPosition = (floor) => this._getPosition(floor)

  getRequest$ = (floor: IFloorRecord): IFloorRequest$ => {
    return this._floorRequest$.value.get(floor) as IFloorRequest$
  }

  getTopPosition: IGetPosition = (floor) => this._getTopPosition(floor)

  hasRequestedElevator (floor: IFloorRecord): boolean {
    return this._floorRequest$.value.get(floor)?.value === true
  }

  setHasRequestedElevator (floor: IFloorRecord, hasRequested: boolean): void {
    this._floorRequest$.value.get(floor)?.next(hasRequested)
  }
}

export const FloorCtrlCtx = createContext(() => container.resolve(FloorCtrl))
