import { FloorCtrlCtx } from '/src/floor/controller'
import { FloorList$Ctx } from '/src/floor/stream'
import { AntdRowCtx } from '/src/pkg/antd/row'
import { TypeStyleClassesCtx } from '/src/pkg/typestyle/classes'
import { Settings$Ctx } from '/src/settings/stream'
import { useStream } from '/src/util/useStream'
import { useStreamCtx } from '/src/util/useStreamCtx'
import { useStyle } from '/src/util/useStyle'
import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { ElevatorCtrlCtx } from '../../elevator/controller'
import { elevatorRowStyle } from '../../elevator/row/style'
import { FloorCallerCtx } from '../caller'
import { FloorCallerProps } from '../caller/props'

const cell = (): NestedCSSProperties => ({
  $debugName: 'elevator-caller-cell',
  borderBottomWidth: 1,
  borderLeftWidth: 1,
})

interface CustomFloorCallerProps extends Omit<FloorCallerProps, 'requested'> {}

function CustomFloorCaller (props: CustomFloorCallerProps): JSX.Element {
  const FloorCaller = useContext(FloorCallerCtx)
  const floorCtrl = useContext(FloorCtrlCtx)()
  const requested = useStream(floorCtrl.getRequest$(props.floor))

  const idBlock = `floor-${props.floor.number}-caller`
  const idModifier = requested ? '-requested' : ''

  return <FloorCaller
    {...props}
    data-testid={idBlock + idModifier}
    requested={requested}
  />
}

function FloorContainer (): JSX.Element {
  const Row = useContext(AntdRowCtx)

  const elevatorCtrl = useContext(ElevatorCtrlCtx)()
  const floors = useStreamCtx(FloorList$Ctx)

  const settings = useStreamCtx(Settings$Ctx)
  const classes = useContext(TypeStyleClassesCtx)

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

export const FloorContainerCtx = createContext(FloorContainer)
