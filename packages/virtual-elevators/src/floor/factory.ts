import { Immutable } from '/src/pkg/immutable'
import { inject, singleton } from 'tsyringe'
import { IFloor, IFloorRecord } from './model'

@singleton()
export class FloorFactory {
  constructor (
    @inject(Immutable) private readonly _immutable: Immutable
  ) {}

  private readonly _FloorRecord = this._immutable.Record<IFloor>({
    number: 0,
  })

  create (state: Partial<IFloor>): IFloorRecord {
    return this._FloorRecord(state)
  }
}
