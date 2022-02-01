import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { Floor$Ctx } from '~/floor/stream'
import { AntdRowCtx } from '~/pkg/antd/row'
import { TypeStyleClassesCtx } from '~/pkg/typestyle/classes'
import { Settings$Ctx } from '~/settings/stream'
import { useStream } from '~/util/useStream'
import { useStreamCtx } from '~/util/useStreamCtx'
import { useStyle } from '~/util/useStyle'
import { ElevatorCallerCtx } from '../caller'
import { ElevatorCallerProps } from '../caller/props'
import { IElevatorRecord } from '../model'
import { ElevatorQueueCtrlCtx } from '../queue/controller'
import { elevatorRowStyle } from '../row/style'

const row = (): NestedCSSProperties => ({
  borderLeftWidth: 1,
  borderBottomWidth: 1,
  justifyContent: 'space-between',
  padding: '0 30px 2px'
})

interface CustomElevatorCallerProps
  extends Omit<ElevatorCallerProps, 'floorHasRequested' | 'onClick'> {
  elevator: IElevatorRecord
}

function CustomElevatorCaller (props: CustomElevatorCallerProps): JSX.Element {
  const ElevatorCaller = useContext(ElevatorCallerCtx)
  const elevatorQueueCtrl = useContext(ElevatorQueueCtrlCtx)

  useStream(elevatorQueueCtrl.getQueueUnit$(props.elevator))

  return <ElevatorCaller
    {...props}
    floorHasRequested={elevatorQueueCtrl.isGoingToFloor(props.elevator, props.floor)}
    onClick={() => elevatorQueueCtrl.insert(props.elevator, props.floor)}
  />
}

interface Props {
  elevator: IElevatorRecord
}

/** Internal elevator buttons */
function ElevatorPanel (props: Props): JSX.Element {
  const Row = useContext(AntdRowCtx)

  const settings = useStreamCtx(Settings$Ctx)
  const floors = useStreamCtx(Floor$Ctx)
  const classes = useContext(TypeStyleClassesCtx)

  const rowClass = classes(
    useStyle(elevatorRowStyle, settings),
    useStyle(row))

  return (
    <Row className={rowClass}>
      {floors.map((floor) => (
        <CustomElevatorCaller
          elevator={props.elevator}
          floor={floor}
          key={floor.number}
        />
      ))}
    </Row>
  )
}

export const ElevatorPanelCtx = createContext(ElevatorPanel)
