import { createContext, useContext } from 'react'
import { AntdColCtx } from '~/view/pkg/antd/col'
import { StateCtx } from '~/view/state'
import { ElevatorCtx } from '../'

function ElevatorHub (): JSX.Element {
  const Col = useContext(AntdColCtx)
  const Elevator = useContext(ElevatorCtx)
  const { elevatorHub } = useContext(StateCtx)

  return (
    <>
      {elevatorHub.elevators.map((elevator) => (
        <Col key={elevator.id} span={6}>
          <Elevator />
        </Col>
      ))}
    </>
  )
}

export const ElevatorHubCtx = createContext(ElevatorHub)
