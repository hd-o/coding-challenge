import { singleton } from 'tsyringe'
import { PromiseFactory } from '../pkg/native/promise'
import { ResolvableFactory } from '../resolvable/factory'
import { Config, Processor } from '.'

@singleton()
export class ProcessorFactory {
  constructor (
    private readonly _promiseFactory: PromiseFactory,
    private readonly _resolvableFactory: ResolvableFactory
  ) {}

  create <State> (config: Config<State>): Processor<State> {
    return new Processor(
      config,
      this._promiseFactory,
      this._resolvableFactory)
  }
}
