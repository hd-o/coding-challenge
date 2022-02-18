import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { FloorCtrlCtx } from '/src/floor/controller'
import { FloorList$Ctx } from '/src/floor/stream'
import { AntdRowCtx } from '/src/pkg/antd/row'
import { TypeStyleClassesCtx } from '/src/pkg/typestyle/classes'
import { Settings$Ctx } from '/src/settings/stream'
import { useStream } from '/src/util/useStream'
import { useStreamCtx } from '/src/util/useStreamCtx'
import { useStyle } from '/src/util/useStyle'
import { ElevatorCallerCtx } from '../'
import { ElevatorCtrlCtx } from '../../controller'
import { elevatorRowStyle } from '../../row/style'
import { ElevatorCallerProps } from '../props'

const cell = (): NestedCSSProperties => ({
  $debugName: 'elevator-caller-cell',
  borderBottomWidth: 1,
  borderLeftWidth: 1
})

interface CustomElevatorCallerProps extends Omit<ElevatorCallerProps, 'floorHasRequested'> {}

function CustomElevatorCaller (props: CustomElevatorCallerProps): JSX.Element {
  const ElevatorCaller = useContext(ElevatorCallerCtx)
  const floorCtrl = useContext(FloorCtrlCtx)
  const floorHasRequested = useStream(floorCtrl.getRequest$(props.floor))
  return <ElevatorCaller {...props} floorHasRequested={floorHasRequested} />
}

function ElevatorCallerRows (): JSX.Element {
  const Row = useContext(AntdRowCtx)

  const elevatorCtrl = useContext(ElevatorCtrlCtx)
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
          <CustomElevatorCaller
            onClick={() => elevatorCtrl.requestElevator(floor)}
            floor={floor}
          />
        </Row>
      ))}
    </>
  )
}

export const ElevatorCallerRowsCtx = createContext(ElevatorCallerRows)
