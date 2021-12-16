import styled from 'styled-components'
import { Cfg } from './config'
import { Cell } from './Cell'
import { ElevatorCar } from './Elevator/Car'
import { ElevatorPanel } from './Elevator/Panel'
import { FC } from 'react'

const ElevatorContainer = styled(Cell)`
  align-items: start;
  height: ${Cfg.floorCount * Cfg.floorHeight}px;
`

export function Elevator () {
  return (
    <>
      <ElevatorContainer>
        <ElevatorCar />
      </ElevatorContainer>
      <ElevatorPanel />
    </>
  )
}
