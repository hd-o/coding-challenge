import { Row } from 'antd'
import { classes } from 'typestyle'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { useSettings$ } from '../settings/stream'
import { useStream } from '../util/useStream'
import { useStyle } from '../util/useStyle'
import { ElevatorCar } from './car'
import { ElevatorMoveState } from './moveState'
import { ElevatorPanel } from './panel'
import { elevatorRowStyle } from './row/style'
import { IElevator$ } from './stream'

const container = (props: {
  floorCount: number
  floorHeight: number
}): NestedCSSProperties => ({
  $debugName: 'elevator-panel',
  alignItems: 'end',
  height: props.floorCount * props.floorHeight,
  position: 'relative',
})

interface Props {
  elevator$: IElevator$
  index: number
}

export function Elevator (props: Props): JSX.Element {
  const elevator = useStream(props.elevator$)
  const settings = useStream(useSettings$())

  const containerClass = classes(
    useStyle(elevatorRowStyle, settings),
    useStyle(container, settings)
  )

  const idBlock = `elevator-${props.index}`
  const idModifier = elevator.moveState === ElevatorMoveState.Moving ? '-moving' : ''

  return (
    <div data-testid={idBlock + idModifier}>
      <Row className={containerClass}>
        <ElevatorCar index={props.index} elevator={elevator} />
      </Row>
      <ElevatorPanel index={props.index} elevator={elevator} />
    </div>
  )
}
