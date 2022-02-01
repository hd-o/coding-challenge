import { createContext, useContext } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { useStream } from '~/util/useStream'
import { useStyle } from '~/util/useStyle'
import { IElevatorRecord } from '../model'
import { ElevatorDoorCtrlCtx } from './controller'

const door = (): NestedCSSProperties => ({
  $debugName: 'elevator-door',
  background: '#555',
  height: '100%',
  transition: 'width 0.25s',
  transitionTimingFunction: 'linear',
  zIndex: 1
})

interface Props {
  elevator: IElevatorRecord
}

interface DoorProps {
  width: string
}

function Door (props: DoorProps): JSX.Element {
  return <div
    className={useStyle(door)}
    style={props}
  />
}

function ElevatorDoor (props: Props): JSX.Element {
  const elevatorDoorCtrl = useContext(ElevatorDoorCtrlCtx)
  const door$ = elevatorDoorCtrl.getDoor$(props.elevator)
  const { position } = useStream(door$)
  const width = `max(calc(${position * 5}% - 0.5px), 0px)`
  return (
    <>
      <Door width={width} />
      <Door width={width} />
    </>
  )
}

export const ElevatorDoorCtx = createContext(ElevatorDoor)
