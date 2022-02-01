import { MemoizedFunction } from 'lodash'
import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { Lodash } from '~/pkg/lodash'
import { Settings$ } from '~/settings/stream'
import { IFloor } from './model'
import { FloorRequest$, IFloorRequestUnit$ } from './requests/stream'
import { Floor$ } from './stream'

type IGetPosition = (floor: IFloor) => number

@singleton()
export class FloorCtrl {
  private readonly _getPosition: MemoizedFunction & IGetPosition

  private readonly _getTopPosition: MemoizedFunction & IGetPosition

  constructor (
    @inject(Floor$) readonly floor$: Floor$,
    @inject(Settings$) readonly settings$: Settings$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(FloorRequest$) private readonly _floorRequest$: FloorRequest$
  ) {
    this._getPosition = lodash.memoize((floor: IFloor): number => {
      return floor.number * settings$.value.floorHeight
    })
    this._getTopPosition = lodash.memoize((floor: IFloor): number => {
      return this.getPosition(floor) + settings$.value.floorHeight
    })
    floor$.subscribe(() => {
      this._getPosition.cache.clear?.()
      this._getTopPosition.cache.clear?.()
    })
  }

  getPosition: IGetPosition = (floor) => this._getPosition(floor)

  getRequestUnit$ = (floor: IFloor): IFloorRequestUnit$ => {
    return this._floorRequest$.value.get(floor) as IFloorRequestUnit$
  }

  getTopPosition: IGetPosition = (floor) => this._getTopPosition(floor)

  hasRequestedElevator (floor: IFloor): boolean {
    return this._floorRequest$.value.get(floor)?.value === true
  }

  setHasRequestedElevator (floor: IFloor, hasRequested: boolean): void {
    this._floorRequest$.value.get(floor)?.next(hasRequested)
  }
}

export const FloorCtrlCtx = createContext(container.resolve(FloorCtrl))
