import { useSettings$ } from '/src/settings/stream'
import { useStream } from '/src/util/useStream'
import { useStyle } from '/src/util/useStyle'
import { Col } from 'antd'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { ElevatorDoor } from '../door'
import { IElevatorRecord } from '../model'
import { useElevatorPositionCtrl } from '../position/controller'

const enum CarPadding {
  top = 8,
  side = 5
}

const container = (props: {
  floorHeight: number
}): NestedCSSProperties => ({
  $debugName: 'elevator-car-container',
  background: '#222',
  display: 'flex',
  height: props.floorHeight,
  justifyContent: 'space-between',
  padding: `${CarPadding.top}px ${CarPadding.side}px`,
  bottom: 0,
  position: 'absolute',
  width: '100%',
})

const interior = (): NestedCSSProperties => ({
  $debugName: 'elevator-interior',
  background: '#ccc',
  height: `calc(100% - ${CarPadding.top * 2}px)`,
  width: `calc(100% - ${CarPadding.side * 2}px)`,
  position: 'absolute',
  zIndex: 0,
})

interface Props {
  elevator: IElevatorRecord
  index: number
}

export function ElevatorCar (props: Props): JSX.Element {
  const settings = useStream(useSettings$())
  const elevatorPositionCtrl = useElevatorPositionCtrl()
  const position = useStream(elevatorPositionCtrl.getPosition$(props.elevator))

  return (
    <Col
      className={useStyle(container, settings)}
      style={{ bottom: position }}
    >
      <div className={useStyle(interior)} />
      <ElevatorDoor
        elevator={props.elevator}
        index={props.index}
      />
    </Col>
  )
}
