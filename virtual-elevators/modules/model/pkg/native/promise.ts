import { singleton } from 'tsyringe'

type Executor <V> = (
  resolve: (value: V) => void,
  reject: (reason: any) => void
) => void

@singleton()
export class PromiseFactory {
  readonly type = Promise

  create <V> (executor: Executor<V>): Promise<V> {
    return new Promise(executor)
  }

  resolve <V> (value: V): Promise<V> {
    return Promise.resolve(value)
  }
}
