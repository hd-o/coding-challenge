import { RecordOf } from 'immutable'

export interface ISettings {
  elevatorMovementStep: number
  elevatorDoorMovementStep: number
  elevatorCount: number
  floorHeight: number
  floorCount: number
}

export type ISettingsRecord = RecordOf<ISettings>
