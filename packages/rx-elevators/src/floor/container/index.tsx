import { useElevatorId$ } from '/src/elevator/id/stream'
import { useRamdaReverse } from '/src/pkg/ramda/reverse'
import { useRamdaTimes } from '/src/pkg/ramda/times'
import { useResolve } from '/src/util/useResolve'
import { useStreamFn } from '/src/util/useStreamFn'
import { FC } from 'react'
import { floorHeight } from '../height'
import { FloorNumber } from '../number'
import { useFloorNumber$ } from '../number/stream'
import { FloorPanelCaller } from '../panel/caller'
import { useFloorRequestEvent$ } from '../request/event/stream'

export const FloorContainer: FC = () => {
  const floorRequestEvent$ = useResolve(useFloorRequestEvent$)
  const reverse = useResolve(useRamdaReverse)
  const times = useResolve(useRamdaTimes)

  const elevatorIds = useStreamFn(useElevatorId$)
  const floorNumbers = useStreamFn(useFloorNumber$)

  const floorCells = times(i => <td key={i} />, elevatorIds.length)

  const handleFloorCall = (number: FloorNumber) =>
    () => floorRequestEvent$.next(number)

  return <>
    {
      reverse(floorNumbers).map(number => (
        <tr key={number} style={{ height: floorHeight }}>
          <td className='two wide' style={{ textAlign: 'center' }}>
            <FloorPanelCaller
              data-testid={`floor-${number}-caller`}
              floor={number}
              onClick={handleFloorCall(number)}
            />
          </td>
          {floorCells}
        </tr>
      ))
    }
  </>
}
