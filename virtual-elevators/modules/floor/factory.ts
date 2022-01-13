import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { Lodash } from '~/pkg/lodash'
import { Settings$ } from '~/settings/stream'
import { IFloor } from './model'

@singleton()
export class FloorFactory {
  constructor (
    _: any,
    @inject(Settings$) settings$: Settings$,
    @inject(Lodash) lodash: Lodash,
    @inject(Immutable) immutable: Immutable,
    private readonly _FloorRecord = immutable.Record<IFloor>({
      number: 0,
      getBottomPosition: lodash.memoize(function (this: IFloor): number {
        return this.number * settings$.value.floorHeight
      }),
      getTopPosition: lodash.memoize(function (this: IFloor): number {
        return this.getBottomPosition() + settings$.value.floorHeight
      })
    })
  ) {}

  create (state: Partial<IFloor>): RecordOf<IFloor> {
    return this._FloorRecord(state)
  }
}
