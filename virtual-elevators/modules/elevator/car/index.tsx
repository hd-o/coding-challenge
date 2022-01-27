import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { AntdColCtx } from '~/pkg/antd/col'
import { Settings$Ctx } from '~/settings/stream'
import { useStream } from '~/util/useStream'
import { useStreamCtx } from '~/util/useStreamCtx'
import { useStyle } from '~/util/useStyle'
import { ElevatorDoorCtx } from '../door'
import { IElevator } from '../model'
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
  width: '100%'
})

const interior = (): NestedCSSProperties => ({
  $debugName: 'elevator-interior',
  background: '#ccc',
  height: `calc(100% - ${CarPadding.top * 2}px)`,
  width: `calc(100% - ${CarPadding.side * 2}px)`,
  position: 'absolute',
  zIndex: 0
})

interface Props {
  elevator: IElevator
}

function ElevatorCar (props: Props): JSX.Element {
  const Col = useContext(AntdColCtx)
  const ElevatorDoor = useContext(ElevatorDoorCtx)

  const settings = useStreamCtx(Settings$Ctx)
  const elevatorPositionCtrl = useContext(ElevatorPositionCtrlCtx)
  const position = useStream(elevatorPositionCtrl.getPositionUnit$(props.elevator))

  return (
    <Col
      className={useStyle(container, settings)}
      style={{ bottom: position }}
    >
      <div className={useStyle(interior)} />
      <ElevatorDoor elevator={props.elevator} />
    </Col>
  )
}

export const ElevatorCarCtx = createContext(ElevatorCar)
