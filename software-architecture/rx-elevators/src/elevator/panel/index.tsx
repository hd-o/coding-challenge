import { FloorCallerCtx } from '/src/floor/caller'
import { FloorNumber } from '/src/floor/number'
import { useFloorNumber$ } from '/src/floor/number/stream'
import { useResolve } from '/src/util/useResolve'
import { useStream } from '/src/util/useStream'
import { useStreamFn } from '/src/util/useStreamFn'
import { createContext, FC, useContext, useMemo } from 'react'
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

  const elevatorQueueItem$ = useMemo(
    () => newElevatorQueueItems$(props.elevator),
    [newElevatorQueueItems$, props.elevator],
  )

  const queueItems = useStream(elevatorQueueItem$)

  const handleClick = (floor: FloorNumber) => () =>
    elevatorQueueInsertEvent$.next(newElevatorFloorPair(props.elevator, floor))

  const isFloorInQueue = (floor: FloorNumber): boolean =>
    queueItems.find(item => 'floor' in item && item.floor === floor) !== undefined

  const testId = `elevator-${props.elevator}-panel`

  return (
    <div data-testid={testId}>
      {
        floorNumbers.map(floor => {
          const requested = isFloorInQueue(floor)
          return <FloorCaller
            key={floor}
            floor={floor}
            onClick={handleClick(floor)}
            requested={requested}
            testidPrefix={testId}
          />
        })
      }
    </div>
  )
}

export const ElevatorPanelCtx = createContext(ElevatorPanel)
