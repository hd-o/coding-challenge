import { createContext, useContext } from 'react'
import { LodashIsEqualWithCtx } from '~/pkg/lodash/isEqualWith'

export const CacheStateCtx = createContext({
  dependencies: new Map(),
  values: new Map()
})

function hasEqualItems (a: any[], b: any[]): boolean {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

function useCache
<Value, Init extends () => Value>
(key: string, dependencies: any[], init: Init): Value {
  const cache = useContext(CacheStateCtx)
  const isEqualWith = useContext(LodashIsEqualWithCtx)
  if (
    cache.values.has(key) &&
    dependencies.length > 0 &&
    isEqualWith(cache.dependencies.get(key), dependencies, hasEqualItems)
  ) {
    return cache.values.get(key)
  }
  cache.dependencies.set(key, dependencies)
  return cache.values.set(key, init()).get(key)
}

export const CacheCtx = createContext(useCache)
