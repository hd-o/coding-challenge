import 'antd/dist/antd.css'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import { PropsWithChildren, useContext } from 'react'
import { Cfg } from './config'
import { Elevator } from './Elevator'
import { ElevatorCallers } from './ElevatorCallers'
import { ReactContext } from '../model/Context/React'

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

function Column (props: PropsWithChildren<{}>) {
  return <Col span={6}>{props.children}</Col>
}

export function App() {
  const { elevatorService } = useContext(ReactContext)
  return (
    <AppContainer>
      <ContainerRow>
        <Column>
          <ElevatorCallers />
        </Column>
        {elevatorService.elevators.map((elevator) => (
          <Column key={elevator.id}>
            <Elevator />
          </Column>
        ))}
      </ContainerRow>
    </AppContainer>
  )
}
