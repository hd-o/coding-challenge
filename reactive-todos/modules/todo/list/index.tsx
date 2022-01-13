import { createContext, useContext } from 'react'
import { Todo$Ctx } from '../stream'
import { useObservableEagerState } from 'observable-hooks'
import { ITodo } from '../model'
import { TodoCtrlCtx } from '../controller'

function TodoList() {
  const todoCtrl = useContext(TodoCtrlCtx)
  const todo$ = useContext(Todo$Ctx)
  const todos = useObservableEagerState(todo$)

  function handleToggle(todo: ITodo) {
    return () => todoCtrl.toggleComplete(todo.id)
  }

  function handleDelete(todo: ITodo) {
    return () => todoCtrl.delete(todo.id)
  }

  return todos.length === 0 ? (
    <p>
      <code>Insert a To-Do through the input above</code>
    </p>
  ) : (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <button onClick={handleToggle(todo)} title="Toggle done">
            {todo.done ? '🟢' : '⚪'}
          </button>{' '}
          &nbsp;
          <button onClick={handleDelete(todo)} title="Delete To-Do">
            {'🗑️'}
          </button>{' '}
          &nbsp;
          <span>{todo.text}</span>
        </li>
      ))}
    </ul>
  )
}

export const TodoListCtx = createContext(TodoList)
