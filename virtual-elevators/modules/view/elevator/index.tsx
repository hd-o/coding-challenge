import styled from 'styled-components'
import { Cfg } from '../config'
import { Row } from '../row'
import { ElevatorCar } from './car'
import { ElevatorPanel } from './panel'

const ElevatorContainer = styled(Row)`
  align-items: start;
  height: ${Cfg.floorCount * Cfg.floorHeight}px;
`

export function Elevator (): JSX.Element {
  return (
    <>
      <ElevatorContainer>
        <ElevatorCar />
      </ElevatorContainer>
      <ElevatorPanel />
    </>
  )
}
