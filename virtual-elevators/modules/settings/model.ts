import { RecordOf } from 'immutable'

export interface ISettings {
  elevatorCount: number
  floorHeight: number
  floorCount: number
}

export type ISettingsRecord = RecordOf<ISettings>
