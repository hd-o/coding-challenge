import { floorHeight } from '/src/floor/height'
import { createContext, FC, useContext } from 'react'
import { ElevatorDoorCtx } from '../door'
import { ElevatorDoorPosition } from '../door/position'
import { ElevatorPosition } from '../position'

interface ElevatorCarProps {
  doorPosition: ElevatorDoorPosition
  position: ElevatorPosition
}

const ElevatorCar: FC<ElevatorCarProps> = (props) => {
  const ElevatorDoor = useContext(ElevatorDoorCtx)

  return (
    <div style={{
      height: floorHeight,
      width: '100%',
      background: '#bbb',
      position: 'absolute',
      bottom: floorHeight + Number(props.position),
      left: 0,
    }}>
      <ElevatorDoor position={props.doorPosition} />
    </div>
  )
}

export const ElevatorCarCtx = createContext(ElevatorCar)
