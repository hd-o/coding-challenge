import { createContext, FC, useContext } from 'react'
import { useStreamFn } from '../util/useStreamFn'
import { ElevatorCarCtx } from './car'
import { ElevatorDoorCtx } from './door'
import { ElevatorDoorState$ } from './door/state/stream'
import { ElevatorId } from './id'
import { ElevatorPanelCtx } from './panel'
import { ElevatorPosition$ } from './position/stream'
import { elevatorQueueItemCategories } from './queue/item/category'
import { useElevatorQueuePair$ } from './queue/pair/stream'

interface Props {
  doorState$: ElevatorDoorState$
  id: ElevatorId
  index: number
  position$: ElevatorPosition$
}

const Elevator: FC<Props> = (props) => {
  const ElevatorCar = useContext(ElevatorCarCtx)
  const ElevatorDoor = useContext(ElevatorDoorCtx)
  const ElevatorPanel = useContext(ElevatorPanelCtx)

  const queuePairs = useStreamFn(useElevatorQueuePair$)
  const isMoving = queuePairs
    .find(({ elevator }) => elevator === props.id)
    ?.queue.first()?.category === elevatorQueueItemCategories.Floor

  const idBlock = `elevator-${props.index}`
  const idModifier = isMoving ? '-moving' : ''

  return (
    <th
      data-testid={`${idBlock}${idModifier}`}
      style={{ textAlign: 'center', position: 'relative', overflow: 'visible' }}
    >
      <ElevatorPanel
        data-testid={idBlock}
        elevator={props.id}
      />
      <ElevatorCar position$={props.position$}>
        <ElevatorDoor
          data-testid={`${idBlock}-door`}
          state$={props.doorState$}
        />
      </ElevatorCar>
    </th>
  )
}

export const ElevatorCtx = createContext(Elevator)
