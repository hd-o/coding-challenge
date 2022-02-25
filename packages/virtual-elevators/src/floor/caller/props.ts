import { IFloorRecord } from '/src/floor/model'

export interface FloorCallerProps {
  floor: IFloorRecord
  requested: boolean
  onClick: () => unknown
  'data-testid'?: string
}
