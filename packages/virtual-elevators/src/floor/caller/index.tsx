import { Button } from 'antd'
import { FloorCallerProps } from './props'

interface Props extends FloorCallerProps { }

export function FloorCaller (props: Props): JSX.Element {
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
