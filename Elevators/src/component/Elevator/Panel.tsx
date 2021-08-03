import { Button } from 'antd'
import styled from 'styled-components'
import { Cell } from '../Cell'
import { Cfg } from '../config'

const ElevatorPanelCell = styled(Cell)`
  border-left: ${Cfg.border};
  border-bottom: ${Cfg.border};
  justify-content: space-between;
  padding: 0 30px 2px;
`

/**
 * Internal elevator buttons
 */
export const ElevatorPanel = () => (
  <ElevatorPanelCell>
    {Cfg.floors.map((floor) => (
      <Button shape="circle" key={floor}>
        {floor}
      </Button>
    ))}
  </ElevatorPanelCell>
)
