import { FC } from 'react'
import { useTodoCtrl } from './controller'
import { TodoModel } from './model'

type TodoHandler = (t: TodoModel) => () => void

interface Props {
  todo: TodoModel
}

export const Todo: FC<Props> = (props) => {
  const { todo } = props
  const todoCtrl = useTodoCtrl()

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
