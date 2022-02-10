import { createContext, useContext } from 'react'
import { AntdButtonCtx } from '~/pkg/antd/Button'
import { ElevatorCallerProps } from './props'

interface Props extends ElevatorCallerProps { }

function ElevatorCaller (props: Props): JSX.Element {
  const Button = useContext(AntdButtonCtx)
  return (
    <Button
      type={props.floorHasRequested ? 'primary' : 'default'}
      onClick={props.onClick}
      shape="circle"
    >
      {props.floor.number}
    </Button>
  )
}

export const ElevatorCallerCtx = createContext(ElevatorCaller)
