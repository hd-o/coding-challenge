import { useContext, useMemo } from 'react'
import { NestedCSSProperties } from 'typestyle/lib/types'
import { TypeStyleCtx } from '../pkg/typestyle/style'

export function useStyle
<Getter extends (...args: any[]) => NestedCSSProperties>
(getter: Getter, ...args: Parameters<typeof getter>): string {
  const style = useContext(TypeStyleCtx)
  return useMemo(
    () => style(getter(...args)),
    [style, getter, args])
}
