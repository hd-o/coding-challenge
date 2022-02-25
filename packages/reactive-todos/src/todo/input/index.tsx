import { createContext, FC, FormEvent, useContext, useState } from 'react'
import { TodoCtrlCtx } from '../controller'

type SubmitHandler = (e: FormEvent<HTMLFormElement>) => void

const TodoInput: FC = () => {
  const todoCtrl = useContext(TodoCtrlCtx)()
  const [todo, setTodo] = useState('')

  const handleSubmit: SubmitHandler = (event) => {
    event.preventDefault()
    if (todo.length === 0) return
    todoCtrl.create(todo)
    setTodo('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid='todo-input'
        type="input"
        value={todo}
        onChange={({ target }) => setTodo(target.value)}
      />
      &nbsp;
      <button
        data-testid='add-todo-button'
        type="submit"
        style={{ cursor: 'pointer' }}
      >
        +
      </button>
    </form>
  )
}

export const TodoInputCtx = createContext(TodoInput)
