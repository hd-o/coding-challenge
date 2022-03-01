import { createContext, useContext } from 'react'
import { CacheCtx } from './cache'

function useFetchJSON (): <V> (path: string) => Promise<V> {
  return useContext(CacheCtx)(
    'fetchJSON', [],
    () => function fetchJSON (path) {
      return fetch(path).then(r => r.json())
    })
}

export const FetchJSONCtx = createContext(useFetchJSON)
