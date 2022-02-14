import { FC, useContext, useEffect } from 'react'
import { ElevatorContainerCtx } from '../elevator/container'
import { SemanticUiContainerCtx } from '../pkg/semantic-ui/Container'
import { useStartup } from '../startup'
import { useResolve } from '../util/useResolve'

export const App: FC<{}> = () => {
  const Container = useContext(SemanticUiContainerCtx)
  const ElevatorContainer = useContext(ElevatorContainerCtx)
  const startup = useResolve(useStartup)

  useEffect(() => {
    const subscription = startup()
    return () => subscription.unsubscribe()
  })

  return (
    <div style={{ paddingTop: 20, minWidth: 600 }}>
      <Container>
        <ElevatorContainer />
      </Container>
    </div>
  )
}
