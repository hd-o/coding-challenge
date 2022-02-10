import { createContext, useContext } from 'react'
import { Elevator$Ctx } from '~/elevator/stream'
import { AntdColCtx } from '~/pkg/antd/col'
import { useStreamCtx } from '~/util/useStreamCtx'
import { ElevatorCtx } from '../'

function ElevatorContainer (): JSX.Element {
  const Col = useContext(AntdColCtx)
  const Elevator = useContext(ElevatorCtx)
  const elevators = useStreamCtx(Elevator$Ctx)
  return (
    <>
      {elevators.valueSeq().map((elevator$) => (
        <Col key={elevator$.value.id} span={6}>
          <Elevator elevator$={elevator$} />
        </Col>
      ))}
    </>
  )
}

export const ElevatorContainerCtx = createContext(ElevatorContainer)
