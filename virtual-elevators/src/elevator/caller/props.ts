import { IFloorRecord } from '/src/floor/model'

export interface ElevatorCallerProps {
  floor: IFloorRecord
  floorHasRequested: boolean
  onClick: () => unknown
}
