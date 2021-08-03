import { Button } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'
import { Cell } from './Cell'
import { Cfg } from './config'

const ElevatorCallerCell = styled(Cell)`
  border-bottom: ${Cfg.border};
  border-left: ${Cfg.border};
`

export function ElevatorCallers () {
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
