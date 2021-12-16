import { Context, ContextType, useContext } from 'react'
import { renderHook } from '@testing-library/react-hooks'

type ResolvedCtx<CtxType extends Context<any>> =
  ContextType<CtxType> extends (...args: any[]) => any
    ? ReturnType<ContextType<CtxType>>
    : ContextType<CtxType>

export function getContext<C extends Context<any>> (ctx: C): ResolvedCtx<typeof ctx> {
  return renderHook(() => {
    const value = useContext(ctx)
    return typeof value === 'function' ? value() : value
  }).result.current
}
