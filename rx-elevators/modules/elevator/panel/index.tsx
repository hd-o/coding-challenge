import { createContext, FC, useContext } from 'react'
import { FloorCallerCtx } from '../../floor/caller'
import { FloorNumber } from '../../floor/number'
import { useFloorNumber$ } from '../../floor/number/stream'
import { useResolve } from '../../util/useResolve'
import { useStream } from '../../util/useStream'
import { useStreamFn } from '../../util/useStreamFn'
import { useNewElevatorFloorPair } from '../floor/pair'
import { ElevatorId } from '../id'
import { useEelevatorQueueInsertEvent$ } from '../queue/insert/event'
import { useNewElevatorQueueItem$ } from '../queue/item/stream'

interface ElevatorPanelProps {
  elevator: ElevatorId
}

const ElevatorPanel: FC<ElevatorPanelProps> = (props) => {
  const FloorCaller = useContext(FloorCallerCtx)

  const elevatorQueueInsertEvent$ = useResolve(useEelevatorQueueInsertEvent$)
  const newElevatorFloorPair = useResolve(useNewElevatorFloorPair)
  const newElevatorQueueItems$ = useResolve(useNewElevatorQueueItem$)
  const floorNumbers = useStreamFn(useFloorNumber$)
  const queueItems = useStream(newElevatorQueueItems$(props.elevator))

  const handleClick = (floor: FloorNumber) => () =>
    elevatorQueueInsertEvent$.next(newElevatorFloorPair(props.elevator, floor))

  const isFloorInQueue = (floor: FloorNumber): boolean =>
    queueItems.find(item => 'floor' in item && item.floor === floor) !== undefined

  return <>
    {floorNumbers.map(floor =>
      <FloorCaller
        key={floor}
        floor={floor}
        onClick={handleClick(floor)}
        active={isFloorInQueue(floor)}
      />
    )}
  </>
}

export const ElevatorPanelCtx = createContext(ElevatorPanel)
