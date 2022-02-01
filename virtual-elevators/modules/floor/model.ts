import { RecordOf } from 'immutable'

export interface IFloor {
  number: number
}

export type IFloorRecord = RecordOf<IFloor>
