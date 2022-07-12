import { Use } from '../util/function-context/context'

interface Storage {
  get: (key: string, defaultValue?: string) => string | undefined
  set: (key: string) => (value: string) => void
}

export const useStorage: Use<Storage> = () => {
  // Prevent SSR errors (localStorage undefined)
  const storage = globalThis.localStorage
  return {
    get: (key, defaultValue) => storage?.getItem(key) ?? defaultValue,
    set: (key) => (value) => storage?.setItem(key, value),
  }
}
