import { atom } from 'jotai'
import { createContext } from 'react'

const countAtom = atom(0)

export const CountAtomCtx = createContext(countAtom)
