import { createContext, FC, useContext } from 'react'
import { SemanticUiTableCtx } from '../pkg/semantic-ui/Table'
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
  const Table = useContext(SemanticUiTableCtx)

  const doorState = useStream(props.doorState$)
  const position = useStream(props.position$)

  return (
    <Table.HeaderCell textAlign='center' style={{ position: 'relative', overflow: 'visible' }}>
      <ElevatorPanel elevator={props.id} />
      <ElevatorCar doorPosition={doorState.position} position={position} />
    </Table.HeaderCell>
  )
}

export const ElevatorCtx = createContext(Elevator)
