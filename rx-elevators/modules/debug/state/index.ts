const state = {
  toggles: {
    tapLog: false,
  },
}

Object.assign(globalThis, { rxElevators: state })

export const useDebugState = (): typeof state => {
  return state
}
