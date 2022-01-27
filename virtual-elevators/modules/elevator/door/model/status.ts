export type ElevatorDoorStatus = 'Open' | 'Opening' | 'Closed' | 'Closing'

type ElevatorDoorStatusMap = Readonly<{[S in ElevatorDoorStatus]: S}>

export const elevatorDoorStatus: ElevatorDoorStatusMap = {
  Closed: 'Closed',
  Closing: 'Closing',
  Open: 'Open',
  Opening: 'Opening'
}
