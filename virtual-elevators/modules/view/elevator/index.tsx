import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { Elevator } from '~/model/elevator'
import { AntdRowCtx } from '../pkg/antd/row'
import { TypeStyleClassesCtx } from '../pkg/typestyle/classes'
import { StateCtx } from '../state'
import { useObserver } from '../util/useObserver'
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

interface Props {
  elevator: Elevator
}

function ElevatorView (props: Props): JSX.Element {
  const ElevatorCar = useObserver(ElevatorCarCtx)
  const ElevatorPanel = useObserver(ElevatorPanelCtx)
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
        <ElevatorCar position={props.elevator.position} />
      </Row>
      <ElevatorPanel
        queue={props.elevator.queue}
        onClick={props.elevator.goTo}
      />
    </>
  )
}

export const ElevatorCtx = createContext(ElevatorView)
