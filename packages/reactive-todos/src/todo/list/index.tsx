import { useObservableEagerState } from 'observable-hooks'
import { FC } from 'react'
import { Todo } from '../'
import { useTodo$ } from '../stream'

export const TodoList: FC = () => {
  const todo$ = useTodo$()
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
