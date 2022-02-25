import { Elevator$Ctx } from '/src/elevator/stream'
import { AntdColCtx } from '/src/pkg/antd/col'
import { useStreamCtx } from '/src/util/useStreamCtx'
import { createContext, useContext } from 'react'
import { ElevatorCtx } from '../'

function ElevatorContainer (): JSX.Element {
  const Col = useContext(AntdColCtx)
  const Elevator = useContext(ElevatorCtx)
  const elevators = useStreamCtx(Elevator$Ctx)
  return (
    <>
      {elevators.valueSeq().map((elevator$, index) => (
        <Col key={elevator$.value.id} span={6}>
          <Elevator index={index} elevator$={elevator$} />
        </Col>
      ))}
    </>
  )
}

export const ElevatorContainerCtx = createContext(ElevatorContainer)
