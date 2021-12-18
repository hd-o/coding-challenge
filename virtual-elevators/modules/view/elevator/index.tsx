import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { AntdRowCtx } from '../pkg/antd/row'
import { TypeStyleClassesCtx } from '../pkg/typestyle/classes'
import { StateCtx } from '../state'
import { useStyle } from '../util/useStyle'
import { ElevatorCarCtx } from './car'
import { ElevatorPanelCtx } from './panel'
import { elevatorRowStyle } from './row/style'

const container = (props: {
  floorCount: number
  floorHeight: number
}): NestedCSSProperties => ({
  $debugName: 'elevator-panel',
  alignItems: 'end',
  height: props.floorCount * props.floorHeight,
  position: 'relative'
})

function Elevator (): JSX.Element {
  const ElevatorCar = useContext(ElevatorCarCtx)
  const ElevatorPanel = useContext(ElevatorPanelCtx)
  const Row = useContext(AntdRowCtx)
  const state = useContext(StateCtx)
  const classes = useContext(TypeStyleClassesCtx)

  const containerClass = classes(
    useStyle(elevatorRowStyle, state.settings),
    useStyle(container, state.settings)
  )

  return (
    <>
      <Row className={containerClass}>
        <ElevatorCar />
      </Row>
      <ElevatorPanel />
    </>
  )
}

export const ElevatorCtx = createContext(Elevator)
