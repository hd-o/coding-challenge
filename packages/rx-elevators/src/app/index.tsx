import { FC, useContext, useEffect, useMemo } from 'react'
import { Subscription } from 'rxjs'
import { BuildingCtx } from '../building'
import { useStartup } from '../startup'
import { useResolve } from '../util/useResolve'

interface Props {
  TestCtrl?: FC
  subscription?: Subscription
}

export const App: FC<Props> = (props) => {
  const Building = useContext(BuildingCtx)
  const TestCtrl = props.TestCtrl ?? (() => <></>)
  const startup = useResolve(useStartup)

  /**
   * Startup subscription needs to happen before rendering
   * child components, so subscribers to shared observables
   * receive the first emitted value
   */
  const subscription = useMemo(
    () => props.subscription ?? startup(),
    [props, startup],
  )

  useEffect(() => () => subscription.unsubscribe())

  return <>
    <div style={{ paddingTop: 20, width: 800, margin: '0 auto' }}>
      <div className='ui container'>
        <Building />
      </div>
    </div>
    <TestCtrl />
  </>
}
