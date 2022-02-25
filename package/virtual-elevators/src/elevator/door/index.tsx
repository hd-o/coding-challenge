import { useStream } from '/src/util/useStream'
import { useStyle } from '/src/util/useStyle'
import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { IElevatorRecord } from '../model'
import { ElevatorDoorCtrlCtx } from './controller'

const door = (): NestedCSSProperties => ({
  $debugName: 'elevator-door',
  background: '#555',
  height: '100%',
  transition: 'width 0.25s',
  transitionTimingFunction: 'linear',
  zIndex: 1,
})

interface Props {
  elevator: IElevatorRecord
  index: number
}

interface DoorProps {
  'data-testid'?: string
  width: string
}

function Door (props: DoorProps): JSX.Element {
  const { 'data-testid': testid, ...style } = props
  return <div
    data-testid={testid}
    className={useStyle(door)}
    style={style}
  />
}

function ElevatorDoor (props: Props): JSX.Element {
  const elevatorDoorCtrl = useContext(ElevatorDoorCtrlCtx)()
  const door$ = elevatorDoorCtrl.getDoor$(props.elevator)
  const { position, status } = useStream(door$)
  // Open door to 25%
  const width = `${(position / 4) * 10 + 25}%`

  const idBlock = `elevator-${props.index}-door`
  const idModifier = `-${status.toLocaleLowerCase()}`

  return (
    <>
      <Door width={width} data-testid={idBlock + idModifier} />
      <Door width={width} />
    </>
  )
}

export const ElevatorDoorCtx = createContext(ElevatorDoor)
