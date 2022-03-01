import { useStream } from '/src/util/useStream'
import { createContext, FC } from 'react'
import { ElevatorDoorState$ } from './state/stream'

interface ElevatorDoorProps {
  'data-testid': string
  state$: ElevatorDoorState$
}

const ElevatorDoor: FC<ElevatorDoorProps> = (props) => {
  const { position, movementState } = useStream(props.state$)
  const idModifier = `-${movementState}`.toLowerCase()

  const panel = <div
    style={{
      background: '#e5e5e5',
      height: '100%',
      // Open door to 25%
      width: `${(position / 4) * 10 + 25}%`,
    }}
  />

  return (
    <div
      data-testid={`${props['data-testid']}${idModifier}`}
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
      }
    }>
      {panel}
      {panel}
    </div>
  )
}

export const ElevatorDoorCtx = createContext(ElevatorDoor)
