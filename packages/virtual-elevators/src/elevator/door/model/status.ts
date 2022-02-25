export type IElevatorDoorStatus = 'Open' | 'Opening' | 'Closed' | 'Closing'

type IElevatorDoorStatusMap = Readonly<{[S in IElevatorDoorStatus]: S}>

export const elevatorDoorStatus: IElevatorDoorStatusMap = {
  Closed: 'Closed',
  Closing: 'Closing',
  Open: 'Open',
  Opening: 'Opening',
}
