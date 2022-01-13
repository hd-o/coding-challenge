import { RecordOf } from 'immutable'

export type IFloor = RecordOf<{
  number: number
  getBottomPosition: () => number
  getTopPosition: () => number
}>
