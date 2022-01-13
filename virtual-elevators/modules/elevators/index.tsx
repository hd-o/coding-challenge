import { createContext, useContext } from 'react'
import { Elevators$Ctx } from '~/elevators/stream'
import { AntdColCtx } from '~/pkg/antd/col'
import { useStreamCtx } from '~/util/useStreamCtx'
import { ElevatorCtx } from '../elevator'

function Elevators (): JSX.Element {
  const Col = useContext(AntdColCtx)
  const Elevator = useContext(ElevatorCtx)
  const elevators = useStreamCtx(Elevators$Ctx)

  return (
    <>
      {elevators.map((elevator$) => (
        <Col key={elevator$.value.id} span={6}>
          <Elevator elevator$={elevator$} />
        </Col>
      ))}
    </>
  )
}

export const ElevatorsCtx = createContext(Elevators)
