import { createContext, FC, useContext } from 'react'
import { SemanticUiButtonCtx } from '../../pkg/semantic-ui/Button'
import { FloorNumber } from '../number'

export interface FloorCallerProps {
  active?: boolean
  disabled?: boolean
  floor: FloorNumber
  onClick: () => unknown
}

const FloorCaller: FC<FloorCallerProps> = (props) => {
  const Button = useContext(SemanticUiButtonCtx)

  return <Button
    primary={props.active}
    disabled={props.disabled ?? props.active}
    style={{ padding: 10, marginTop: 5 }}
    onClick={props.onClick}
  >
    {props.floor}
  </Button>
}

export const FloorCallerCtx = createContext(FloorCaller)
