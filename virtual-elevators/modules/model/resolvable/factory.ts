import { singleton } from 'tsyringe'
import { PromiseFactory } from '../pkg/native/promise'
import { Resolvable } from './'

@singleton()
export class ResolvableFactory {
  private readonly _Promise = this._promiseFactory.type

  private readonly _Resolvable =
    class Resolvable extends this._Promise<void> {
      constructor (ctx: { resolve?: () => void } = {}) {
        super((resolve) => {
          ctx.resolve = resolve
        })
        this.resolve = (): true => {
          if (ctx.resolve !== undefined) ctx.resolve()
          return true
        }
      }

      resolve: () => true
    }

  constructor (
    private readonly _promiseFactory: PromiseFactory
  ) {}

  create (): Resolvable {
    return new this._Resolvable()
  }
}
