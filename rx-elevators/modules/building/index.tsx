import { createContext, FC, useContext } from 'react'
import { ElevatorContainerCtx } from '../elevator/container'
import { FloorContainerCtx } from '../floor/container'
import { floorHeight } from '../floor/height'
import { SemanticUiTableCtx } from '../pkg/semantic-ui/Table'

const Building: FC<{}> = () => {
  const ElevatorContainer = useContext(ElevatorContainerCtx)
  const FloorContainer = useContext(FloorContainerCtx)
  const Table = useContext(SemanticUiTableCtx)

  return (
    <Table fixed compact celled definition unstackable>
      <Table.Body>
        <FloorContainer />
      </Table.Body>
      <Table.Footer fullWidth style={{ height: floorHeight }}>
        <Table.Row>
          <Table.HeaderCell />
          <ElevatorContainer />
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export const BuildingCtx = createContext(Building)
