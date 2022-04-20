import { FC, FormEvent, useState } from 'react'
import { useTodoCtrl } from '../controller'

type SubmitHandler = (e: FormEvent<HTMLFormElement>) => void

export const TodoInput: FC = () => {
  const todoCtrl = useTodoCtrl()
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
        type='input'
        value={todo}
        onChange={({ target }) => setTodo(target.value)}
      />
      &nbsp;
      <button
        data-testid='add-todo-button'
        type='submit'
        style={{ cursor: 'pointer' }}
      >
        +
      </button>
    </form>
  )
}
