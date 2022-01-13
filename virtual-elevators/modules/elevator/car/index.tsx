import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { AntdColCtx } from '~/pkg/antd/col'
import { Settings$Ctx } from '~/settings/stream'
import { useStreamCtx } from '~/util/useStreamCtx'
import { useStyle } from '~/util/useStyle'

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

const door = (props = {
  open: false
}): NestedCSSProperties => ({
  $debugName: 'elevator-door',
  background: '#555',
  height: '100%',
  transition: 'width 2s',
  width: `calc(${props.open ? 25 : 50}% - 0.5px)`,
  zIndex: 1
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
  position: number
}

function ElevatorCar (props: Props): JSX.Element {
  const Col = useContext(AntdColCtx)
  const settings = useStreamCtx(Settings$Ctx)
  return (
    <Col
      className={useStyle(container, settings)}
      style={{ bottom: props.position }}
    >
      <div className={useStyle(interior)} />
      <div className={useStyle(door)} />
      <div className={useStyle(door)} />
    </Col>
  )
}

export const ElevatorCarCtx = createContext(ElevatorCar)
