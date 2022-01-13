import { atom } from 'jotai'
import { createContext } from 'react'

const writerAtom = atom(
  null,
  (_get, _set, write: (get: typeof _get, set: typeof _set) => void) => {
    write(_get, _set)
  },
)

export const WriterAtomCtx = createContext(writerAtom)
