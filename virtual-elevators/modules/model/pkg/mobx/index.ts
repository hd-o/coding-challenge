import { makeAutoObservable } from 'mobx'
import { singleton } from 'tsyringe'

@singleton()
export class MobX {
  makeAutoObservable = makeAutoObservable
}
