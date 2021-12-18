import { singleton } from 'tsyringe'
import { Config, Processor } from './'

@singleton()
export class ProcessorFactory {
  create <State> (config: Config<State>): Processor<State> {
    return new Processor(config)
  }
}
