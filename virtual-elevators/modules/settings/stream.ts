import { RecordOf } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '../pkg/immutable'
import { ISettings } from './model'

@singleton()
export class Settings$ extends BehaviorSubject<RecordOf<ISettings>> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable,
    readonly _SettingsRecord = immutable.Record<ISettings>({
      elevatorCount: 3,
      floorHeight: 100,
      floorCount: 6
    })
  ) {
    super(_SettingsRecord())
    // TODO: Handle settings update (unmounts, and subscriptions)
  }
}

export const Settings$Ctx = createContext(container.resolve(Settings$))
