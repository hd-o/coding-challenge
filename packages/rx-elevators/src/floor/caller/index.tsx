import { FC } from 'react'
import { FloorNumber } from '../number'

export interface FloorCallerProps {
  'data-testid': string
  disabled?: boolean
  floor: FloorNumber
  onClick: () => unknown
  requested?: boolean
}

export const FloorCaller: FC<FloorCallerProps> = (props) => {
  const requested = props.requested === true
  const requestedClassName = requested ? 'primary' : 'info'

  /**
   * Example:
   * - elevator-0-button-floor-2-requested
   * - floor-1-caller
   * - floor-1-caller-requested
   */
  const idBlock = props['data-testid']
  const idModifier = requested ? '-requested' : ''

  return <button
    className={`ui button ${requestedClassName}`}
    data-testid={`${idBlock}${idModifier}`}
    disabled={props.disabled ?? props.requested}
    style={{ padding: 10, marginTop: 5 }}
    onClick={props.onClick}
  >
    {props.floor}
  </button>
}
