import { createContext, FC, useContext } from 'react'
import { useElevatorId$ } from '../../elevator/id/stream'
import { FloorPanelCallerCtx } from '../../floor/panel/caller'
import { useRamdaReverse } from '../../pkg/ramda/reverse'
import { useRamdaTimes } from '../../pkg/ramda/times'
import { SemanticUiTableCtx } from '../../pkg/semantic-ui/Table'
import { useResolve } from '../../util/useResolve'
import { useStreamFn } from '../../util/useStreamFn'
import { floorHeight } from '../height'
import { FloorNumber } from '../number'
import { useFloorNumber$ } from '../number/stream'
import { useFloorRequestEvent$ } from '../request/event/stream'

const FloorContainer: FC<{}> = () => {
  const FloorPanelCaller = useContext(FloorPanelCallerCtx)
  const Table = useContext(SemanticUiTableCtx)

  const floorRequestEvent$ = useResolve(useFloorRequestEvent$)
  const reverse = useResolve(useRamdaReverse)
  const times = useResolve(useRamdaTimes)

  const elevatorIds = useStreamFn(useElevatorId$)
  const floorNumbers = useStreamFn(useFloorNumber$)

  const floorCells = times(i => <Table.Cell key={i} />, elevatorIds.length)

  const handleFloorCall = (number: FloorNumber) =>
    () => floorRequestEvent$.next(number)

  return <>
    {
      reverse(floorNumbers).map(number => (
        <Table.Row key={number} style={{ height: floorHeight }}>
          <Table.Cell width='2' textAlign='center'>
            <FloorPanelCaller
              floor={number}
              onClick={handleFloorCall(number)}
            />
          </Table.Cell>
          {floorCells}
        </Table.Row>
      ))
    }
  </>
}

export const FloorContainerCtx = createContext(FloorContainer)
