import { FC } from 'react'
import { render } from 'react-dom'
import { atom, useAtom } from 'jotai'
import { createContext, useContext } from 'react'
import { WriterAtomCtx } from './writerAtom'

const countAtom = atom(0)
const CountAtomCtx = createContext(countAtom)

const useIncrementCount = () => {
  // Context allows for custom countAtom injection
  // at any point higher up in the render tree.
  // See App component below
  const countAtom = useContext(CountAtomCtx)
  const write = useAtom(useContext(WriterAtomCtx))[1]
  const incrementCount = () => {
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

const customCountAtom = atom(0)

const App: FC<{}> = () => {
  return (
    <div>
      <Counter />
      <CountAtomCtx.Provider value={customCountAtom}>
        <Counter />
      </CountAtomCtx.Provider>
    </div>
  )
}

render(<App />, document.getElementById('app'))
