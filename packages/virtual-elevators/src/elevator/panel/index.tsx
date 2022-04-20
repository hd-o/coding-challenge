import { useFloorList$ } from '/src/floor/stream'
import { useSettings$ } from '/src/settings/stream'
import { useStream } from '/src/util/useStream'
import { useStyle } from '/src/util/useStyle'
import { Row } from 'antd'
import { classes } from 'typestyle'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { FloorCaller } from '../../floor/caller'
import { FloorCallerProps } from '../../floor/caller/props'
import { IElevatorRecord } from '../model'
import { useElevatorQueueCtrl } from '../queue/controller'
import { elevatorRowStyle } from '../row/style'

const row = (): NestedCSSProperties => ({
  $debugName: 'elevator-panel-row',
  borderLeftWidth: 1,
  borderBottomWidth: 1,
  justifyContent: 'space-between',
  padding: '10px 20px',
})

interface CustomFloorCallerProps
  extends Omit<FloorCallerProps, 'requested' | 'onClick'> {
  elevator: IElevatorRecord
  index: number
}

function CustomFloorCaller (props: CustomFloorCallerProps): JSX.Element {
  const elevatorQueueCtrl = useElevatorQueueCtrl()

  useStream(elevatorQueueCtrl.getQueue$(props.elevator))

  const requested = elevatorQueueCtrl.isGoingToFloor(props.elevator, props.floor)
  const idBlock = `elevator-${props.index}-button-floor-${props.floor.number}`
  const idModifier = requested ? '-requested' : ''

  return <FloorCaller
    {...props}
    data-testid={idBlock + idModifier}
    requested={requested}
    onClick={() => elevatorQueueCtrl.insert(props.elevator, props.floor)}
  />
}

interface Props {
  elevator: IElevatorRecord
  index: number
}

/** Internal elevator buttons */
export function ElevatorPanel (props: Props): JSX.Element {
  const settings = useStream(useSettings$())
  const floors = useStream(useFloorList$())

  const rowClass = classes(
    useStyle(elevatorRowStyle, settings),
    useStyle(row))

  return (
    <Row className={rowClass}>
      {floors.map((floor) => (
        <CustomFloorCaller
          index={props.index}
          elevator={props.elevator}
          floor={floor}
          key={floor.number}
        />
      ))}
    </Row>
  )
}
