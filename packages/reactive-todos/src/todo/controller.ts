import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { Lodash } from '../pkg/lodash'
import { TodoModel } from './model'
import { Todo$ } from './stream'

@singleton()
export class TodoCtrl {
  constructor (
    @inject(Todo$) private readonly _todo$: Todo$,
    @inject(Lodash) private readonly _lodash: Lodash,
  ) {}

  create (todoText: string): void {
    const todos = this._todo$.value.concat({
      done: false,
      id: this._lodash.uniqueId('todo_'),
      text: todoText,
    })
    this._todo$.next(todos)
  }

  delete (todoId: TodoModel['id']): void {
    const todos = this._todo$.value.filter((todo) => todo.id !== todoId)
    this._todo$.next(todos)
  }

  toggleComplete (todoId: TodoModel['id']): void {
    const todos = this._todo$.value.map((todo) =>
      todo.id !== todoId ? todo : { ...todo, done: !todo.done },
    )
    this._todo$.next(todos)
  }
}

export const TodoCtrlCtx = createContext(() => container.resolve(TodoCtrl))
