import { createContext, FC, useContext } from 'react'
import { TodoCtrlCtx } from './controller'
import { TodoModel } from './model'

type TodoHandler = (t: TodoModel) => () => void

interface Props {
  todo: TodoModel
}

const Todo: FC<Props> = (props) => {
  const { todo } = props
  const todoCtrl = useContext(TodoCtrlCtx)()

  const handleToggle: TodoHandler = (todo) => {
    return () => todoCtrl.toggleComplete(todo.id)
  }

  const handleDelete: TodoHandler = (todo) => {
    return () => todoCtrl.delete(todo.id)
  }

  return (
    <li>
      <button
        onClick={handleToggle(todo)}
        title={`Toggle: ${todo.text}`}
      >
        {todo.done ? '🟢' : '⚪'}
      </button>
      {' '}
      <button
        onClick={handleDelete(todo)}
        title={`Delete: ${todo.text}`}
      >
        {'🗑️'}
      </button>
      {' '}
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
    </li>
  )
}

export const TodoCtx = createContext(Todo)
