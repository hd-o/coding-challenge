import { FloorList$Ctx } from '/src/floor/stream'
import { AntdRowCtx } from '/src/pkg/antd/row'
import { TypeStyleClassesCtx } from '/src/pkg/typestyle/classes'
import { Settings$Ctx } from '/src/settings/stream'
import { useStream } from '/src/util/useStream'
import { useStreamCtx } from '/src/util/useStreamCtx'
import { useStyle } from '/src/util/useStyle'
import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { ElevatorCallerCtx } from '../caller'
import { ElevatorCallerProps } from '../caller/props'
import { IElevatorRecord } from '../model'
import { ElevatorQueueCtrlCtx } from '../queue/controller'
import { elevatorRowStyle } from '../row/style'

const row = (): NestedCSSProperties => ({
  borderLeftWidth: 1,
  borderBottomWidth: 1,
  justifyContent: 'space-between',
  padding: '0 30px 2px',
})

interface CustomElevatorCallerProps
  extends Omit<ElevatorCallerProps, 'floorHasRequested' | 'onClick'> {
  elevator: IElevatorRecord
  index: number
}

function CustomElevatorCaller (props: CustomElevatorCallerProps): JSX.Element {
  const ElevatorCaller = useContext(ElevatorCallerCtx)
  const elevatorQueueCtrl = useContext(ElevatorQueueCtrlCtx)()
  const requested = elevatorQueueCtrl.isGoingToFloor(props.elevator, props.floor)

  useStream(elevatorQueueCtrl.getQueue$(props.elevator))

  const idBlock = `elevator-${props.index}-button-floor-${props.floor.number}`
  const idModifier = requested ? '-requested' : ''

  return <ElevatorCaller
    {...props}
    data-testid={idBlock + idModifier}
    floorHasRequested={requested}
    onClick={() => elevatorQueueCtrl.insert(props.elevator, props.floor)}
  />
}

interface Props {
  elevator: IElevatorRecord
  index: number
}

/** Internal elevator buttons */
function ElevatorPanel (props: Props): JSX.Element {
  const Row = useContext(AntdRowCtx)

  const settings = useStreamCtx(Settings$Ctx)
  const floors = useStreamCtx(FloorList$Ctx)
  const classes = useContext(TypeStyleClassesCtx)

  const rowClass = classes(
    useStyle(elevatorRowStyle, settings),
    useStyle(row))

  return (
    <Row className={rowClass}>
      {floors.map((floor) => (
        <CustomElevatorCaller
          index={props.index}
          elevator={props.elevator}
          floor={floor}
          key={floor.number}
        />
      ))}
    </Row>
  )
}

export const ElevatorPanelCtx = createContext(ElevatorPanel)
