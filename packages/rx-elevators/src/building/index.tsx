import { FC } from 'react'
import { ElevatorContainer } from '../elevator/container'
import { FloorContainer } from '../floor/container'
import { floorHeight } from '../floor/height'

export const Building: FC = () => {
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
