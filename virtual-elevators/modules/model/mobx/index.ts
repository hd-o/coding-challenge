import { injectable } from 'inversify'
import { makeAutoObservable } from 'mobx'

@injectable()
export class MobX {
  makeAutoObservable = makeAutoObservable
}
