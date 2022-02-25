import { AntdButtonCtx } from '/src/pkg/antd/Button'
import { createContext, useContext } from 'react'
import { FloorCallerProps } from './props'

interface Props extends FloorCallerProps { }

function FloorCaller (props: Props): JSX.Element {
  const Button = useContext(AntdButtonCtx)
  return (
    <Button
      data-testid={props['data-testid']}
      type={props.requested ? 'primary' : 'default'}
      onClick={props.onClick}
      shape="circle"
    >
      {props.floor.number}
    </Button>
  )
}

export const FloorCallerCtx = createContext(FloorCaller)
