import { Row } from 'antd'
import styled from 'styled-components'
import { Cfg } from './config'

export const Cell = styled(Row)`
  height: ${Cfg.floorHeight}px;
  background: #eee;
  align-items: center;
  justify-content: center;
  zoom: 0.9;
`
