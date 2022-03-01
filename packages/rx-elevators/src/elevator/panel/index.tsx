import { FloorCallerCtx } from '/src/floor/caller'
import { FloorNumber } from '/src/floor/number'
import { useFloorNumber$ } from '/src/floor/number/stream'
import { useResolve } from '/src/util/useResolve'
import { useStream } from '/src/util/useStream'
import { useStreamFn } from '/src/util/useStreamFn'
import { createContext, FC, useContext, useMemo } from 'react'
import { useNewElevatorFloorPair } from '../floor/pair'
import { ElevatorId } from '../id'
import { useElevatorQueueInsertEvent$ } from '../queue/insert/event'
import { useNewElevatorQueueItem$ } from '../queue/item/stream'

interface ElevatorPanelProps {
  'data-testid': string
  elevator: ElevatorId
}

const ElevatorPanel: FC<ElevatorPanelProps> = (props) => {
  const FloorCaller = useContext(FloorCallerCtx)

  const elevatorQueueInsertEvent$ = useResolve(useElevatorQueueInsertEvent$)
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

  const idBlock = `${props['data-testid']}-button`

  return (
    <div>
      {
        floorNumbers.map(floor => {
          const requested = isFloorInQueue(floor)
          const idElement = `-floor-${floor}`
          return <FloorCaller
            data-testid={`${idBlock}${idElement}`}
            key={floor}
            floor={floor}
            onClick={handleClick(floor)}
            requested={requested}
          />
        })
      }
    </div>
  )
}

export const ElevatorPanelCtx = createContext(ElevatorPanel)
