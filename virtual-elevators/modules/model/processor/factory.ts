import { singleton } from 'tsyringe'
import { PromiseFactory } from '../pkg/native/promise'
import { Config, Processor } from './'

@singleton()
export class ProcessorFactory {
  constructor (private readonly _promiseFactory: PromiseFactory) {}

  create <State> (config: Config<State>): Processor<State> {
    return new Processor(config, this._promiseFactory)
  }
}
