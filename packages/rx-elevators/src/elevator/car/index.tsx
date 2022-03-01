import { floorHeight } from '/src/floor/height'
import { useStream } from '/src/util/useStream'
import { createContext, FC } from 'react'
import { ElevatorPosition$ } from '../position/stream'

interface ElevatorCarProps {
  position$: ElevatorPosition$
}

const ElevatorCar: FC<ElevatorCarProps> = (props) => {
  const position = useStream(props.position$)
  return (
    <div style={{
      height: floorHeight,
      width: '100%',
      background: '#bbb',
      position: 'absolute',
      bottom: floorHeight + Number(position),
      left: 0,
    }}>
      {props.children}
    </div>
  )
}

export const ElevatorCarCtx = createContext(ElevatorCar)
