import { useStreamFn } from '/src/util/useStreamFn'
import { FC } from 'react'
import { Elevator } from '../'
import { useElevatorDoorState$Map$ } from '../door/state/stream/map'
import { useElevatorId$ } from '../id/stream'
import { useElevatorPosition$Map$ } from '../position/stream/map/stream'

export const ElevatorContainer: FC = () => {
  const elevatorIds = useStreamFn(useElevatorId$)
  const doorState$Map = useStreamFn(useElevatorDoorState$Map$)
  const position$Map = useStreamFn(useElevatorPosition$Map$)

  return <>
    {
      elevatorIds.map((id, index) => {
        const doorState$ = doorState$Map.get(id)
        const position$ = position$Map.get(id)
        if (position$ === undefined) return null
        if (doorState$ === undefined) return null
        return <Elevator
          doorState$={doorState$}
          id={id}
          index={index}
          key={String(id)}
          position$={position$}
        />
      })
    }
  </>
}
