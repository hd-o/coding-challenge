import { makeAutoObservable } from 'mobx'
import { singleton } from 'tsyringe'

type MakeAutoObservable = typeof makeAutoObservable
type Params = Parameters<MakeAutoObservable>

@singleton()
export class MobX {
  makeAutoObservable <T extends object> (
    target: T,
    annotations?: Params[1],
    options?: Params[2]
  ): T {
    return makeAutoObservable<T>(
      target,
      annotations,
      { ...options, autoBind: true })
  }
}
