import { createContext, FC, useContext } from 'react'
import { useStream } from '../util/useStream'
import { ElevatorCarCtx } from './car'
import { ElevatorDoorState$ } from './door/state/stream'
import { ElevatorId } from './id'
import { ElevatorPanelCtx } from './panel'
import { ElevatorPosition$ } from './position/stream'

interface Props {
  doorState$: ElevatorDoorState$
  id: ElevatorId
  position$: ElevatorPosition$
}

const Elevator: FC<Props> = (props) => {
  const ElevatorCar = useContext(ElevatorCarCtx)
  const ElevatorPanel = useContext(ElevatorPanelCtx)

  const doorState = useStream(props.doorState$)
  const position = useStream(props.position$)

  return (
    <th style={{ textAlign: 'center', position: 'relative', overflow: 'visible' }}>
      <ElevatorPanel elevator={props.id} />
      <ElevatorCar doorPosition={doorState.position} position={position} />
    </th>
  )
}

export const ElevatorCtx = createContext(Elevator)
