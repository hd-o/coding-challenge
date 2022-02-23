import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '../pkg/immutable'
import { ISettings, ISettingsRecord } from './model'

@singleton()
export class Settings$ extends BehaviorSubject<ISettingsRecord> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable
  ) {
    super(SettingsRecord())
    function SettingsRecord (): ISettingsRecord {
      return immutable.Record<ISettings>({
        elevatorCount: 3,
        floorHeight: 100,
        floorCount: 6,
      })()
    }
  }
}

export const Settings$Ctx = createContext(() => container.resolve(Settings$))
