import { AntdColCtx } from '/src/pkg/antd/col'
import { Settings$Ctx } from '/src/settings/stream'
import { useStream } from '/src/util/useStream'
import { useStreamCtx } from '/src/util/useStreamCtx'
import { useStyle } from '/src/util/useStyle'
import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { ElevatorDoorCtx } from '../door'
import { IElevatorRecord } from '../model'
import { ElevatorPositionCtrlCtx } from '../position/controller'

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

function ElevatorCar (props: Props): JSX.Element {
  const Col = useContext(AntdColCtx)
  const ElevatorDoor = useContext(ElevatorDoorCtx)

  const settings = useStreamCtx(Settings$Ctx)
  const elevatorPositionCtrl = useContext(ElevatorPositionCtrlCtx)()
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

export const ElevatorCarCtx = createContext(ElevatorCar)
