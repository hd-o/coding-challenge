import { FloorCaller, FloorCallerProps } from '/src/floor/caller'
import { useNewFloorRequested$ } from '/src/floor/requested/stream'
import { useResolve } from '/src/util/useResolve'
import { useStream } from '/src/util/useStream'
import { FC, useMemo } from 'react'

export const FloorPanelCaller: FC<FloorCallerProps> = (props) => {
  const newFloorRequested$ = useResolve(useNewFloorRequested$)

  const floorRequested$ = useMemo(
    () => newFloorRequested$(props.floor),
    [newFloorRequested$, props.floor]
  )

  const floorRequested = useStream(floorRequested$)

  return <FloorCaller
    {...props}
    disabled={false}
    requested={floorRequested}
  />
}
