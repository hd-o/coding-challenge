import { atom, useAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { WriterAtomCtx } from './writerAtom'

const countAtom = atom(0)
const CountAtomCtx = createContext(countAtom)

function useIncrementCount() {
  // Context allows for custom countAtom injection
  // at any point higher up in the render tree.
  // See App component below
  const countAtom = useContext(CountAtomCtx)
  const write = useAtom(useContext(WriterAtomCtx))[1]
  return function incrementCount() {
    // Atom setter allows components like IncrementButton
    // to get/set the value of countAtom without re-rendering
    // on countAtom's changes. The value of countAtom is only
    // resolved when running incrementCount
    write((get, set) => {
      set(countAtom, get(countAtom) + 1)
    })
  }
}

function Count() {
  const countAtom = useContext(CountAtomCtx)
  const count = useAtom(countAtom)[0]
  return <p>Count: {count}</p>
}

function IncrementButton() {
  const handleClick = useIncrementCount()
  return <button onClick={handleClick}>Increment</button>
}

function Counter() {
  return (
    <div>
      <Count />
      <IncrementButton />
    </div>
  )
}

const customCountAtom = atom(0)

export default function App() {
  return (
    <div>
      <Counter />
      <CountAtomCtx.Provider value={customCountAtom}>
        <Counter />
      </CountAtomCtx.Provider>
    </div>
  )
}
