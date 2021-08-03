import { Col } from 'antd'
import styled from 'styled-components'
import { Cfg } from '../config'

const carPadding = { top: 8, side: 5 } as const

interface CarContainerProps {
  top: number
}

const CarContainer = styled(Col)<CarContainerProps>`
  background: #222;
  display: flex;
  padding: ${carPadding.top}px ${carPadding.side}px;
  justify-content: space-between;
  height: ${Cfg.floorHeight}px;
  width: 100%;
  top: ${(_) => _.top}px;
`

interface CarDoorProps {
  open: boolean
  left?: true
}

const ElevatorCarDoor = styled.div<CarDoorProps>`
  background: #555;
  height: 100%;
  width: calc(${({ open }) => (open ? 25 : 50)}% - 0.5px);
  transition: width 2s;
  z-index: 1;
`

const ElevatorInterior = styled.div`
  background: #ccc;
  height: calc(100% - ${carPadding.top * 2}px);
  width: calc(100% - ${carPadding.side * 2}px);
  position: absolute;
  z-index: 0;
`
// TODO: Refactor config
export const ElevatorCar = () => {
  const openDoors = false
  return (
    <CarContainer top={200}>
      <ElevatorInterior />
      <ElevatorCarDoor left open={openDoors} />
      <ElevatorCarDoor open={openDoors} />
    </CarContainer>
  )
}
