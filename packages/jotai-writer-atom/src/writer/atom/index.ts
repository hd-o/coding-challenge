import { atom } from 'jotai'
import { createContext } from 'react'

type Writer <Get, Set> = (get: Get, set: Set) => void

const writerAtom = atom(
  null,
  (get, set, write: Writer<typeof get, typeof set>) => {
    write(get, set)
  },
)

export const WriterAtomCtx = createContext(writerAtom)
