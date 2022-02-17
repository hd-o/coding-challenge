import { FC, createContext, FormEvent, useContext, useState } from 'react'
import { TodoCtrlCtx } from '../controller'

const TodoInput: FC<{}> = () => {
  const todoCtrl = useContext(TodoCtrlCtx)
  const [todo, setTodo] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (todo.length === 0) return
    todoCtrl.create(todo)
    setTodo('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="input"
        value={todo}
        onChange={({ target }) => setTodo(target.value)}
      />
      &nbsp;
      <button type="submit" style={{ cursor: 'pointer' }}>
        +
      </button>
    </form>
  )
}

export const TodoInputCtx = createContext(TodoInput)
