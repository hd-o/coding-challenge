import { createContext, FC } from 'react'
import { ElevatorPosition } from '../position'

interface ElevatorDoorProps {
  position: ElevatorPosition
}

const ElevatorDoor: FC<ElevatorDoorProps> = (props) => {
  const panel = <div
    style={{
      background: '#e5e5e5',
      height: '100%',
      // Open door to 25%
      width: `${(props.position / 4) * 10 + 25}%`,
    }}
  />
  return (
    <div style={{
      display: 'flex',
      height: '100%',
      width: '100%',
      justifyContent: 'space-between',
    }}>
      {panel}
      {panel}
    </div>
  )
}

export const ElevatorDoorCtx = createContext(ElevatorDoor)
