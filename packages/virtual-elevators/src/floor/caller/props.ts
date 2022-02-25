import { IFloorRecord } from '/src/floor/model'

export interface FloorCallerProps {
  'data-testid'?: string
  floor: IFloorRecord
  onClick: () => unknown
  requested: boolean
}
