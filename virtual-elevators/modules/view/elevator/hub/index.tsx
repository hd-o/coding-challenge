import { createContext, useContext } from 'react'
import { AntdColCtx } from '~/view/pkg/antd/col'
import { StateCtx } from '~/view/state'
import { useObserver } from '~/view/util/useObserver'
import { ElevatorCtx } from '../'

function ElevatorHub (): JSX.Element {
  const Col = useContext(AntdColCtx)
  const Elevator = useObserver(ElevatorCtx)
  const { elevatorHub } = useContext(StateCtx)

  return (
    <>
      {elevatorHub.elevators.map((elevator) => (
        <Col key={elevator.id} span={6}>
          <Elevator elevator={elevator} />
        </Col>
      ))}
    </>
  )
}

export const ElevatorHubCtx = createContext(ElevatorHub)
