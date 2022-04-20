import { useFloorCtrl } from '/src/floor/controller'
import { useFloorList$ } from '/src/floor/stream'
import { useSettings$ } from '/src/settings/stream'
import { useStream } from '/src/util/useStream'
import { useStyle } from '/src/util/useStyle'
import { Row } from 'antd'
import { classes } from 'typestyle'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { useElevatorCtrl } from '../../elevator/controller'
import { elevatorRowStyle } from '../../elevator/row/style'
import { FloorCaller } from '../caller'
import { FloorCallerProps } from '../caller/props'

const cell = (): NestedCSSProperties => ({
  $debugName: 'floor-caller-cell',
  borderBottomWidth: 1,
  borderLeftWidth: 1,
})

interface CustomFloorCallerProps extends Omit<FloorCallerProps, 'requested'> { }

function CustomFloorCaller (props: CustomFloorCallerProps): JSX.Element {
  const floorCtrl = useFloorCtrl()
  const requested = useStream(floorCtrl.getRequest$(props.floor))

  const idBlock = `floor-${props.floor.number}-caller`
  const idModifier = requested ? '-requested' : ''

  return <FloorCaller
    {...props}
    data-testid={idBlock + idModifier}
    requested={requested}
  />
}

export function FloorContainer (): JSX.Element {
  const elevatorCtrl = useElevatorCtrl()
  const floors = useStream(useFloorList$())

  const settings = useStream(useSettings$())

  const cellClass = classes(
    useStyle(elevatorRowStyle, settings),
    useStyle(cell))

  return (
    <>
      {floors.slice().reverse().map((floor) => (
        <Row className={cellClass} key={floor.number}>
          <CustomFloorCaller
            onClick={() => elevatorCtrl.requestElevator(floor)}
            floor={floor}
          />
        </Row>
      ))}
    </>
  )
}
