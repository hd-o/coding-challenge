import { FC } from 'react'
import { useStreamFn } from '../util/useStreamFn'
import { ElevatorCar } from './car'
import { ElevatorDoor } from './door'
import { ElevatorDoorState$ } from './door/state/stream'
import { ElevatorId } from './id'
import { ElevatorPanel } from './panel'
import { ElevatorPosition$ } from './position/stream'
import { elevatorQueueItemCategories } from './queue/item/category'
import { useElevatorQueuePair$ } from './queue/pair/stream'

interface Props {
  doorState$: ElevatorDoorState$
  id: ElevatorId
  index: number
  position$: ElevatorPosition$
}

export const Elevator: FC<Props> = (props) => {
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
