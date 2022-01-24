import { IFloor } from '~/floor/model'

export interface ElevatorCallerProps {
  floor: IFloor
  floorHasRequested: boolean
  onClick: () => unknown
}
