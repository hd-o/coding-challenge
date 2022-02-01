import { RecordOf } from 'immutable'
import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, inject, singleton } from 'tsyringe'
import { Immutable } from '../pkg/immutable'
import { ISettings } from './model'

// TODO: Handle settings update (unmounts, and subscriptions)
// TODO: use ISettingsRecord
type ISettingsRecord = RecordOf<ISettings>

@singleton()
export class Settings$ extends BehaviorSubject<ISettingsRecord> {
  constructor (
    @inject(Immutable) readonly immutable: Immutable
  ) {
    super(SettingsRecord())
    function SettingsRecord (): RecordOf<ISettings> {
      return immutable.Record<ISettings>({
        elevatorCount: 3,
        floorHeight: 100,
        floorCount: 6
      })()
    }
  }
}

export const Settings$Ctx = createContext(container.resolve(Settings$))
