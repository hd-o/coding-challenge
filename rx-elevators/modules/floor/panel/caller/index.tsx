import { createContext, FC, useContext, useMemo } from 'react'
import { useResolve } from '../../../util/useResolve'
import { useStream } from '../../../util/useStream'
import { FloorCallerCtx, FloorCallerProps } from '../../caller'
import { useNewFloorRequested$ } from '../../requested/stream'

const FloorPanelCaller: FC<FloorCallerProps> = (props) => {
  const FloorCaller = useContext(FloorCallerCtx)
  const newFloorRequested$ = useResolve(useNewFloorRequested$)

  const floorRequested$ = useMemo(
    () => newFloorRequested$(props.floor),
    [newFloorRequested$, props.floor]
  )

  const floorRequested = useStream(floorRequested$)

  return <FloorCaller
    {...props}
    active={floorRequested}
    disabled={false}
  />
}

export const FloorPanelCallerCtx = createContext(FloorPanelCaller)
