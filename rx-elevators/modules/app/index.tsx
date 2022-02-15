import { FC, useContext, useEffect, useMemo } from 'react'
import { BuildingCtx } from '../building'
import { SemanticUiContainerCtx } from '../pkg/semantic-ui/Container'
import { useStartup } from '../startup'
import { useResolve } from '../util/useResolve'

export const App: FC<{}> = () => {
  const Container = useContext(SemanticUiContainerCtx)
  const Building = useContext(BuildingCtx)
  const startup = useResolve(useStartup)

  /**
   * Startup subscription needs to happen before rendering
   * child components, so subscribers to shared observables
   * receive the first emitted value
   */
  const subscription = useMemo(() => startup(), [startup])

  useEffect(() => () => subscription.unsubscribe())

  return (
    <div style={{ paddingTop: 20, minWidth: 600 }}>
      <Container>
        <Building />
      </Container>
    </div>
  )
}
