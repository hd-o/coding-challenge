import 'antd/dist/antd.css'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import { FC, useContext } from 'react'
import { Cfg } from './config'
import { Elevator } from './Elevator'
import { ElevatorCallers } from './ElevatorCallers'
import { UiContext } from '../model/Context/react'

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

const Column: FC = (props) => {
  return <Col span={6}>{props.children}</Col>
}

export function App() {
  const { elevatorService } = useContext(UiContext)
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
