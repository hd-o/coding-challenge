import { createContext, FC, useContext } from 'react'
import { ElevatorCtx } from '../'
import { floorHeight } from '../../floor/height'
import { FloorNumber } from '../../floor/number'
import { useFloorNumber$ } from '../../floor/number/stream'
import { FloorPanelCallerCtx } from '../../floor/panel/caller'
import { useFloorRequestEvent$ } from '../../floor/request/event/stream'
import { useRamdaReverse } from '../../pkg/ramda/reverse'
import { useRamdaTimes } from '../../pkg/ramda/times'
import { SemanticUiTableCtx } from '../../pkg/semantic-ui/Table'
import { useResolve } from '../../util/useResolve'
import { useStreamFn } from '../../util/useStreamFn'
import { useElevatorDoorState$Map$ } from '../door/state/stream/map'
import { useElevatorId$ } from '../id/stream'
import { useElevatorPosition$Map$ } from '../position/stream/map/stream'

const ElevatorContainer: FC<{}> = () => {
  const Elevator = useContext(ElevatorCtx)
  const FloorPanelCaller = useContext(FloorPanelCallerCtx)
  const Table = useContext(SemanticUiTableCtx)

  const floorRequestEvent$ = useResolve(useFloorRequestEvent$)
  const reverse = useResolve(useRamdaReverse)
  const times = useResolve(useRamdaTimes)

  const elevatorIds = useStreamFn(useElevatorId$)
  const floorNumbers = useStreamFn(useFloorNumber$)

  const doorState$Map = useStreamFn(useElevatorDoorState$Map$)
  const position$Map = useStreamFn(useElevatorPosition$Map$)

  const elevators = elevatorIds.map((id) => {
    const doorState$ = doorState$Map.get(id)
    const position$ = position$Map.get(id)
    if (position$ === undefined) return null
    if (doorState$ === undefined) return null
    return <Elevator
      doorState$={doorState$}
      id={id}
      key={String(id)}
      position$={position$} />
  })

  const newTableCell = (i: number): JSX.Element => <Table.Cell key={i} />

  const elevatorFloorCells = times(newTableCell, elevatorIds.length)

  const handleFloorCall = (number: FloorNumber) =>
    () => floorRequestEvent$.next(number)

  const floors = reverse(floorNumbers).map(number => (
    <Table.Row key={number} style={{ height: floorHeight }}>
      <Table.Cell width='2' textAlign='center'>
        <FloorPanelCaller
          floor={number}
          onClick={handleFloorCall(number)}
        />
      </Table.Cell>
      {elevatorFloorCells}
    </Table.Row>
  ))

  return (
    <Table fixed compact celled definition unstackable>
      <Table.Body>
        {floors}
      </Table.Body>
      <Table.Footer fullWidth style={{ height: floorHeight }}>
        <Table.Row>
          <Table.HeaderCell />
          {elevators}
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export const ElevatorContainerCtx = createContext(ElevatorContainer)
