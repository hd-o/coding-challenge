import 'semantic-ui-css/semantic.min.css'
import { useObservableState } from 'observable-hooks'
import { reverse, times } from 'ramda'
import { FC, useEffect, useMemo } from 'react'
import { render } from 'react-dom'
import { Button, Container, Table } from 'semantic-ui-react'
import * as m from './model'
import * as u from './util'

const model = m.createModel()

// --------------------------------------------------------------------------------
// #region Floor

interface FloorCallerProps {
  active?: boolean
  disabled?: boolean
  floor: m.FloorNumber
  onClick: () => unknown
}

const FloorCaller: FC<FloorCallerProps> = (props) => (
  <Button
    primary={props.active}
    disabled={props.disabled ?? props.active}
    style={{ padding: 10, marginTop: 5 }}
    onClick={props.onClick}
  >
    {props.floor}
  </Button>
)

const FloorPanelCaller: FC<FloorCallerProps> = (props) => {
  const floorRequested = useObservableState(model.floorRequested$(props.floor), false)
  return <FloorCaller {...props} active={floorRequested} disabled={false} />
}

// #endregion
// --------------------------------------------------------------------------------
// #region Elevator

interface ElevatorPanelProps {
  elevator: m.ElevatorId
}

const ElevatorPanel: FC<ElevatorPanelProps> = (props) => {
  const floorNumbers = u.useStream(model.floorNumber$)
  const queueItems = useObservableState(model.getElevatorQueueItems$(props.elevator), [])

  const handleClick = (floor: m.FloorNumber) => () =>
    model.elevatorQueueInsertEvent$.next(model.newElevatorFloorPair(props.elevator, floor))

  const isFloorInQueue = (floor: m.FloorNumber): boolean =>
    queueItems.find(item => 'floor' in item && item.floor === floor) !== undefined

  return <>
    {floorNumbers.map(floor =>
      <FloorCaller
        key={floor}
        floor={floor}
        onClick={handleClick(floor)}
        active={isFloorInQueue(floor)}
      />
    )}
  </>
}

interface ElevatorDoorProps {
  position: m.Position
}

const ElevatorDoor: FC<ElevatorDoorProps> = (props) => {
  const panel = <div
    style={{
      background: '#e5e5e5',
      height: '100%',
      // Open door to 25%
      width: `${(props.position / 4) * 10 + 25}%`,
    }}
  />
  return (
    <div style={{
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'space-between',
    }}>
      {panel}
      {panel}
    </div>
  )
}

interface ElevatorCarProps {
  doorPosition: m.Position
  position: m.Position
}

const ElevatorCar: FC<ElevatorCarProps> = (props) => {
  const height = m.floorHeight
  return (
    <div style={{
      height,
      width: '100%',
      background: '#bbb',
      position: 'absolute',
      bottom: height + Number(props.position),
      left: 0,
    }}>
      <ElevatorDoor position={props.doorPosition} />
    </div>
  )
}

interface ElevatorProps {
  id: m.ElevatorId
  doorState$: m.ElevatorDoorState$
  position$: m.ElevatorPosition$
}

const Elevator: FC<ElevatorProps> = (props) => {
  const doorState = u.useStream(props.doorState$)
  const position = useObservableState(props.position$, () => 0)
  return (
    <Table.HeaderCell textAlign='center' style={{ position: 'relative', overflow: 'visible' }}>
      <ElevatorPanel elevator={props.id} />
      <ElevatorCar doorPosition={doorState.position} position={position} />
    </Table.HeaderCell>
  )
}

const ElevatorApp: FC<{}> = () => {
  const ids = u.useStream(model.elevatorId$)
  const doorPosition$Map = u.useStream(model.elevatorDoorState$Map$)
  const position$Map = u.useStream(model.elevatorPosition$Map$)
  const floorNumbers = u.useStream(model.floorNumber$)

  const elevators = ids.map((id) => {
    const doorPosition$ = doorPosition$Map.get(id)
    const position$ = position$Map.get(id)
    if (position$ === undefined) return null
    if (doorPosition$ === undefined) return null
    return <Elevator
      doorState$={doorPosition$}
      id={id}
      key={String(id)}
      position$={position$} />
  })

  const newTableCell = (i: number): JSX.Element => <Table.Cell key={i} />

  const elevatorFloorCells = times(newTableCell)(ids.length)

  const handleFloorCall = (number: m.FloorNumber) =>
    () => model.floorRequestEvent$.next(number)

  const floors =
    reverse(floorNumbers).map(number => {
      return (
        <Table.Row key={number} style={{ height: m.floorHeight }}>
          <Table.Cell width='2' textAlign='center'>
            <FloorPanelCaller
              floor={number}
              onClick={handleFloorCall(number)}
            />
          </Table.Cell>
          {elevatorFloorCells}
        </Table.Row>
      )
    })

  return (
    <Table fixed compact celled definition unstackable>
      <Table.Body>
        {floors}
      </Table.Body>
      <Table.Footer fullWidth style={{ height: m.floorHeight }}>
        <Table.Row>
          <Table.HeaderCell />
          {elevators}
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

// #endregion
// --------------------------------------------------------------------------------
// #region App

const App: FC<{}> = () => {
  const modelSub = useMemo(() => model.startup(), [])
  useEffect(() => () => modelSub.unsubscribe())
  return (
    <div style={{ paddingTop: 20, minWidth: 600 }}>
      <Container>
        <ElevatorApp />
      </Container>
    </div>
  )
}

render(<App />, document.getElementById('app'))

// #endregion
// --------------------------------------------------------------------------------
