import { singleton } from 'tsyringe'
import { PromiseFactory } from '../pkg/native/promise'

@singleton()
export class TimerFactory {
  constructor (
    private readonly _promiseFactory: PromiseFactory
  ) {}

  create (msDuration: number): Promise<void> {
    return this._promiseFactory.create((resolve) => setTimeout(resolve, msDuration))
  }
}
