import { RecordOf } from 'immutable'

export interface ISettings {
  elevatorCount: number
  elevatorDoorMovementStep: number
  elevatorMovementStep: number
  floorCount: number
  floorHeight: number
}

export type ISettingsRecord = RecordOf<ISettings>
