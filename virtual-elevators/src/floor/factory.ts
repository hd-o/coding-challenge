import { inject, singleton } from 'tsyringe'
import { Immutable } from '/src/pkg/immutable'
import { IFloor, IFloorRecord } from './model'

@singleton()
export class FloorFactory {
  private readonly _FloorRecord = this._immutable.Record<IFloor>({
    number: 0,
  })

  constructor (
    @inject(Immutable) private readonly _immutable: Immutable
  ) {}

  create (state: Partial<IFloor>): IFloorRecord {
    return this._FloorRecord(state)
  }
}
