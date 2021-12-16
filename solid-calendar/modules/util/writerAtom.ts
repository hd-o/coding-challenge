import { Getter, Setter, WritableAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { JotaiAtomCtx } from '~/pkg/jotai/atom'

let writerAtom: WritableAtom<null, (get: Getter, set: Setter) => void>

function useWriterAtom (): typeof writerAtom {
  const atom = useContext(JotaiAtomCtx)
  return writerAtom ?? (writerAtom =
    atom(null, (getter, setter, write) => write(getter, setter))
  )
}

export const WriterAtomCtx = createContext(useWriterAtom)
