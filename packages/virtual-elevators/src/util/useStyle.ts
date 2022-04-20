import { useMemo } from 'react'
import { style } from 'typestyle'
import { NestedCSSProperties } from 'typestyle/lib/types'

export function useStyle
<Getter extends (...args: any[]) => NestedCSSProperties>
(getter: Getter, ...args: Parameters<typeof getter>): string {
  return useMemo(
    () => style(getter(...args)),
    [getter, args])
}
