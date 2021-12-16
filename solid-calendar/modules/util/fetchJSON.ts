import { createContext } from 'react'

let fetchJSON: <V> (path: RequestInfo) => Promise<V>

function useFetchJSON (): typeof fetchJSON {
  return fetchJSON ?? (fetchJSON =
    async (path) => await fetch(path).then(async r => await r.json())
  )
}

export const FetchJSONCtx = createContext(useFetchJSON)
