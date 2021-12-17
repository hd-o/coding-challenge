import { Context, ContextType, useContext, useMemo } from 'react'
import { MobXObserverCtx } from '../pkg/mobx/observer'

export function useObserver
<
  Component extends (...args: any[]) => JSX.Element,
  ComponentCtx extends Context<Component>
>
(context: ComponentCtx): ContextType<typeof context> {
  const observer = useContext(MobXObserverCtx)
  const component = useContext(context)
  return useMemo(
    () => observer(component) as ContextType<typeof context>,
    [observer, component])
}
