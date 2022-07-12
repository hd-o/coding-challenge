import { Use } from './function-context/context'

type FetchParams = Parameters<typeof fetch>

type FetchJSON = <V> (...args: FetchParams) => Promise<V>

export const useFetchJSON: Use<FetchJSON> = () =>
  (...args) => fetch(...args).then(r => r.json())
