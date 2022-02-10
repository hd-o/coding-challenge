import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { AntdRowCtx } from '../pkg/antd/row'
import { TypeStyleClassesCtx } from '../pkg/typestyle/classes'
import { Settings$Ctx } from '../settings/stream'
import { useStream } from '../util/useStream'
import { useStreamCtx } from '../util/useStreamCtx'
import { useStyle } from '../util/useStyle'
import { ElevatorCarCtx } from './car'
import { ElevatorPanelCtx } from './panel'
import { elevatorRowStyle } from './row/style'
import { IElevator$ } from './stream'

const container = (props: {
  floorCount: number
  floorHeight: number
}): NestedCSSProperties => ({
  $debugName: 'elevator-panel',
  alignItems: 'end',
  height: props.floorCount * props.floorHeight,
  position: 'relative'
})

interface Props {
  elevator$: IElevator$
}

function Elevator (props: Props): JSX.Element {
  const ElevatorCar = useContext(ElevatorCarCtx)
  const ElevatorPanel = useContext(ElevatorPanelCtx)
  const Row = useContext(AntdRowCtx)

  const elevator = useStream(props.elevator$)
  const settings = useStreamCtx(Settings$Ctx)
  const classes = useContext(TypeStyleClassesCtx)

  const containerClass = classes(
    useStyle(elevatorRowStyle, settings),
    useStyle(container, settings)
  )

  return (
    <>
      <Row className={containerClass}>
        <ElevatorCar elevator={elevator} />
      </Row>
      <ElevatorPanel elevator={elevator} />
    </>
  )
}

export const ElevatorCtx = createContext(Elevator)