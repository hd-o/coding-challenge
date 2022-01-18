import { RecordOf } from 'immutable'
import { inject, singleton } from 'tsyringe'
import { Immutable } from '~/pkg/immutable'
import { Lodash } from '~/pkg/lodash'
import { Settings$ } from '~/settings/stream'
import { IFloor } from './model'

@singleton()
export class FloorFactory {
  constructor (
    @inject(Settings$) readonly settings$: Settings$,
    @inject(Lodash) readonly lodash: Lodash,
    @inject(Immutable) readonly immutable: Immutable,
    private readonly _FloorRecord = immutable.Record<IFloor>({
      number: 0
    })
  ) {}

  create (state: IFloor): RecordOf<IFloor> {
    return this._FloorRecord(state)
  }
}
