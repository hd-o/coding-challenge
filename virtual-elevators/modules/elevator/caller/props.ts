import { IFloorRecord } from '~/floor/model'

export interface ElevatorCallerProps {
  floor: IFloorRecord
  floorHasRequested: boolean
  onClick: () => unknown
}
