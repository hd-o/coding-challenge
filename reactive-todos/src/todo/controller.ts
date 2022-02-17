import { createContext } from 'react'
import { container, inject, singleton } from 'tsyringe'
import { Lodash } from '../pkg/lodash'
import { ITodo } from './model'
import { Todo$ } from './stream'

@singleton()
export class TodoCtrl {
  constructor(
    @inject(Todo$) private _todoStream: Todo$,
    @inject(Lodash) private _lodash: Lodash,
  ) {}
  create(todoText: string): void {
    const todos = this._todoStream.value.concat({
      done: false,
      id: this._lodash.uniqueId('todo_'),
      text: todoText,
    })
    this._todoStream.next(todos)
  }
  delete(todoId: ITodo['id']): void {
    const todos = this._todoStream.value.filter((todo) => todo.id !== todoId)
    this._todoStream.next(todos)
  }
  toggleComplete(todoId: ITodo['id']): void {
    const todos = this._todoStream.value.map((todo) =>
      todo.id !== todoId ? todo : { ...todo, done: !todo.done },
    )
    this._todoStream.next(todos)
  }
}

export const TodoCtrlCtx = createContext(container.resolve(TodoCtrl))
