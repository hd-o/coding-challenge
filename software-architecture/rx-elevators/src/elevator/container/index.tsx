import { useStreamFn } from '/src/util/useStreamFn'
import { createContext, FC, useContext } from 'react'
import { ElevatorCtx } from '../'
import { useElevatorDoorState$Map$ } from '../door/state/stream/map'
import { useElevatorId$ } from '../id/stream'
import { useElevatorPosition$Map$ } from '../position/stream/map/stream'

const ElevatorContainer: FC<{}> = () => {
  const Elevator = useContext(ElevatorCtx)

  const elevatorIds = useStreamFn(useElevatorId$)
  const doorState$Map = useStreamFn(useElevatorDoorState$Map$)
  const position$Map = useStreamFn(useElevatorPosition$Map$)

  return <>
    {
      elevatorIds.map((id) => {
        const doorState$ = doorState$Map.get(id)
        const position$ = position$Map.get(id)
        if (position$ === undefined) return null
        if (doorState$ === undefined) return null
        return <Elevator
          doorState$={doorState$}
          id={id}
          key={String(id)}
          position$={position$}
        />
      })
    }
  </>
}

export const ElevatorContainerCtx = createContext(ElevatorContainer)
