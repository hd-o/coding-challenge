import { useObservableEagerState } from 'observable-hooks'
import { createContext, FC, useContext } from 'react'
import { TodoCtx } from '../'
import { Todo$Ctx } from '../stream'

const TodoList: FC = () => {
  const Todo = useContext(TodoCtx)
  const todo$ = useContext(Todo$Ctx)()
  const todos = useObservableEagerState(todo$)

  if (todos.length === 0) {
    return (
      <p>
        <code>Insert a To-Do through the input above</code>
      </p>
    )
  }

  return (
    <ul>
      {
        todos.map((todo) =>
          <Todo key={todo.id} todo={todo} />)
      }
    </ul>
  )
}

export const TodoListCtx = createContext(TodoList)
