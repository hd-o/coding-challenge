import { createContext } from 'react'
import { BehaviorSubject } from 'rxjs'
import { container, singleton } from 'tsyringe'
import { ITodo } from './model'

@singleton()
export class Todo$ extends BehaviorSubject<ITodo[]> {
  constructor () {
    super([])
  }
}

export const Todo$Ctx = createContext(() => container.resolve(Todo$))
