import { Getter, Setter, WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'
import { CacheCtx } from './cache'

type AtomType = WritableAtom<null, (get: Getter, set: Setter) => void>

function useWriterAtom (): AtomType {
  const atom = useContext(JotaiAtomCtx)
  return useContext(CacheCtx)(
    'writerAtom', [atom],
    () => atom(null, (get, set, write) => write(get, set)))
}

export const WriterAtomCtx = createContext(useWriterAtom)
