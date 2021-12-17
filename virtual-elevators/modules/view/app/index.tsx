import 'antd/dist/antd.css'
import { Col, Row } from 'antd'
import { PropsWithChildren, useContext } from 'react'
import styled from 'styled-components'
import { Cfg } from '../config'
import { Elevator } from '../elevator'
import { ElevatorCallers } from '../elevator/callers'
import { StateCtx } from '../state'

const AppContainer = styled.div`
  padding: 20px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 650px;
  min-width: 500px;
`

const ContainerRow = styled(Row)`
  border-top: ${Cfg.border};
  border-right: ${Cfg.border};
`

function Column (props: PropsWithChildren<{}>): JSX.Element {
  return <Col span={6}>{props.children}</Col>
}

export function App (): JSX.Element {
  const state = useContext(StateCtx)
  return (
    <AppContainer>
      <ContainerRow>
        <Column>
          <ElevatorCallers />
        </Column>
        {state.elevatorController.elevators.map((elevator) => (
          <Column key={elevator.id}>
            <Elevator />
          </Column>
        ))}
      </ContainerRow>
    </AppContainer>
  )
}
