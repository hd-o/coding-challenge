import { atom, useAtom } from 'jotai'
import { createContext, FC, useContext, useMemo } from 'react'
import { WriterAtomCtx } from '../writer/atom'

const countAtom = atom(0)
export const CountAtomCtx = createContext(countAtom)

type IncrementCount = () => void

const useIncrementCount = (): IncrementCount => {
  // Context allows for custom countAtom injection
  // at any point higher up in the render tree.
  // See App component below
  const countAtom = useContext(CountAtomCtx)
  const writerAtom = useContext(WriterAtomCtx)
  const write = useAtom(writerAtom)[1]
  const incrementCount: IncrementCount = () => {
    // Atom setter allows components like IncrementButton
    // to get/set the value of countAtom without re-rendering
    // on countAtom's changes. The value of countAtom is only
    // resolved when running incrementCount
    write((get, set) => {
      set(countAtom, get(countAtom) + 1)
    })
  }
  return incrementCount
}

const Count: FC<{}> = () => {
  const countAtom = useContext(CountAtomCtx)
  const count = useAtom(countAtom)[0]
  return <p>Count: {count}</p>
}

const IncrementButton: FC<{}> = () => {
  const handleClick = useIncrementCount()
  return <button onClick={handleClick}>Increment</button>
}

const Counter: FC<{}> = () => {
  return (
    <div>
      <Count />
      <IncrementButton />
    </div>
  )
}

export const App: FC<{}> = () => {
  const customCountAtom = useMemo(() => atom(0), [atom])
  return (
    <div>
      <Counter />
      <CountAtomCtx.Provider value={customCountAtom}>
        <Counter />
      </CountAtomCtx.Provider>
    </div>
  )
}
