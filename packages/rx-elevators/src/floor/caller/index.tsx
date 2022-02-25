import { createContext, FC } from 'react'
import { FloorNumber } from '../number'

export interface FloorCallerProps {
  disabled?: boolean
  floor: FloorNumber
  onClick: () => unknown
  requested?: boolean
  testidPrefix: string
}

const FloorCaller: FC<FloorCallerProps> = (props) => {
  const requested = props.requested === true
  const requestedClassName = requested ? 'primary' : 'info'

  /**
   * Example:
   * - elevator-panel__floor-caller-0--requested
   * - floor-panel__floor-caller-1
   */
  const testIdBlock = props.testidPrefix
  const testIdElement = `__floor-caller-${props.floor}`
  const testIdModifier = requested ? '--requested' : ''

  return <button
    className={`ui button ${requestedClassName}`}
    data-testid={`${testIdBlock}${testIdElement}${testIdModifier}`}
    disabled={props.disabled ?? props.requested}
    style={{ padding: 10, marginTop: 5 }}
    onClick={props.onClick}
  >
    {props.floor}
  </button>
}

export const FloorCallerCtx = createContext(FloorCaller)
