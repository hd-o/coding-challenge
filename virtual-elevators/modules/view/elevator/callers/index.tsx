import { Button } from 'antd'
import styled from 'styled-components'
import { Cfg } from '../../config'
import { Row } from '../../row'

const ElevatorCallerCell = styled(Row)`
  border-bottom: ${Cfg.border};
  border-left: ${Cfg.border};
`

export function ElevatorCallers (): JSX.Element {
  return (
    <>
      {Cfg.floors.map((floor) => (
        <ElevatorCallerCell key={floor}>
          <Button shape="circle">{floor}</Button>
        </ElevatorCallerCell>
      ))}
    </>
  )
}
