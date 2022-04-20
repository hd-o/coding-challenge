import { floorHeight } from '/src/floor/height'
import { useStream } from '/src/util/useStream'
import { FC } from 'react'
import { ElevatorPosition$ } from '../position/stream'

interface ElevatorCarProps {
  position$: ElevatorPosition$
}

export const ElevatorCar: FC<ElevatorCarProps> = (props) => {
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
