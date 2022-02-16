import { createContext, FC, useContext } from 'react'
import { useElevatorId$ } from '../../elevator/id/stream'
import { FloorPanelCallerCtx } from '../../floor/panel/caller'
import { useRamdaReverse } from '../../pkg/ramda/reverse'
import { useRamdaTimes } from '../../pkg/ramda/times'
import { useResolve } from '../../util/useResolve'
import { useStreamFn } from '../../util/useStreamFn'
import { floorHeight } from '../height'
import { FloorNumber } from '../number'
import { useFloorNumber$ } from '../number/stream'
import { useFloorRequestEvent$ } from '../request/event/stream'

const FloorContainer: FC<{}> = () => {
  const FloorPanelCaller = useContext(FloorPanelCallerCtx)

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
              floor={number}
              onClick={handleFloorCall(number)}
              testidPrefix='floor-panel'
            />
          </td>
          {floorCells}
        </tr>
      ))
    }
  </>
}

export const FloorContainerCtx = createContext(FloorContainer)
