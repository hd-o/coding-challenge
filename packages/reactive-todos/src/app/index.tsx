import { FC } from 'react'
import { TodoInput } from '../todo/input'
import { TodoList } from '../todo/list'

export const App: FC = () => {
  return (
    <div style={{ padding: '5px 0 0 20px' }}>
      <h2>To-Dos</h2>
      <TodoInput />
      <TodoList />
    </div>
  )
}
