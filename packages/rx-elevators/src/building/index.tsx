import { createContext, FC, useContext } from 'react'
import { ElevatorContainerCtx } from '../elevator/container'
import { FloorContainerCtx } from '../floor/container'
import { floorHeight } from '../floor/height'

const Building: FC = () => {
  const ElevatorContainer = useContext(ElevatorContainerCtx)
  const FloorContainer = useContext(FloorContainerCtx)

  return (
    <table className='ui compact celled definition unstackable table'>
      <tbody>
        <FloorContainer />
      </tbody>
      <tfoot className='full-width'>
        <tr style={{ height: floorHeight }}>
          <th />
          <ElevatorContainer />
        </tr>
      </tfoot>
    </table>
  )
}

export const BuildingCtx = createContext(Building)
