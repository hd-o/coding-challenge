import { createContext, FC, useContext } from 'react'
import { useResolve } from '../../../util/useResolve'
import { useStream } from '../../../util/useStream'
import { FloorCallerCtx, FloorCallerProps } from '../../caller'
import { useNewFloorRequested$ } from '../../requested/stream'

const FloorPanelCaller: FC<FloorCallerProps> = (props) => {
  const FloorCaller = useContext(FloorCallerCtx)
  const newFloorRequested$ = useResolve(useNewFloorRequested$)
  const floorRequested = useStream(newFloorRequested$(props.floor))
  return <FloorCaller {...props} active={floorRequested} disabled={false} />
}

export const FloorPanelCallerCtx = createContext(FloorPanelCaller)
