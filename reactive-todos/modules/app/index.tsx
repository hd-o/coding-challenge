import { createContext, useContext } from 'react'
import { TodoInputCtx } from '../todo/input'
import { TodoListCtx } from '../todo/list'

function App() {
  const TodoInput = useContext(TodoInputCtx)
  const TodoList = useContext(TodoListCtx)
  return (
    <div style={{ padding: '5px 0 0 20px' }}>
      <h2>To-Dos</h2>
      <TodoInput />
      <TodoList />
    </div>
  )
}

export const AppCtx = createContext(App)
