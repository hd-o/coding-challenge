export type ElevatorDoorPosition = number

type ElevatorDoorPositions = Readonly<Record<'closed'|'open', ElevatorDoorPosition>>

export const elevatorDoorPositions: ElevatorDoorPositions = {
  closed: 10,
  open: 0,
}
