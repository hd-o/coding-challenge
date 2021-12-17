import { Button } from 'antd'
import styled from 'styled-components'
import { Cfg } from '../../config'
import { Row } from '../../row'

const ElevatorPanelCell = styled(Row)`
  border-left: ${Cfg.border};
  border-bottom: ${Cfg.border};
  justify-content: space-between;
  padding: 0 30px 2px;
`

/**
 * Internal elevator buttons
 */
export function ElevatorPanel (): JSX.Element {
  return (
    <ElevatorPanelCell>
      {Cfg.floors.map((floor) => (
        <Button shape="circle" key={floor}>
          {floor}
        </Button>
      ))}
    </ElevatorPanelCell>
  )
}
