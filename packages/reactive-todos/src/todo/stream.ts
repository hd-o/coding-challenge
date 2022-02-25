import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, singleton } from 'tsyringe'
import { TodoModel } from './model'

@singleton()
export class Todo$ extends BehaviorSubject<TodoModel[]> {
  constructor () {
    super([])
  }
}

export const Todo$Ctx = createContext(() => container.resolve(Todo$))
