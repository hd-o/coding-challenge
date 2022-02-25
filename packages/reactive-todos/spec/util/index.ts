import { singleton } from 'tsyringe'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

@singleton()
export class TestUtil {
  readonly mockValues = [
    'something first',
    'something second',
  ]

  get addTodoButton (): HTMLButtonElement {
    return screen.getByTestId('add-todo-button')
  }

  get todoInput (): HTMLInputElement {
    return screen.getByTestId<HTMLInputElement>('todo-input')
  }

  async addTodo (text: string): Promise<void> {
    await this.typeTodo(text)
    await userEvent.click(this.addTodoButton)
  }

  async deleteTodo (text: string): Promise<void> {
    const deleteButton = screen.getByTitle(`Delete: ${text}`)
    await userEvent.click(deleteButton)
  }

  async submitTodo (text: string): Promise<void> {
    await this.typeTodo(`${text}{enter}`)
  }

  todoNotFound (text: string): boolean {
    try {
      screen.getByText(text)
      return false
    } catch {
      return true
    }
  }

  async toggleTodo (text: string): Promise<void> {
    const toggleButton = screen.getByTitle(`Toggle: ${text}`)
    await userEvent.click(toggleButton)
  }

  async typeTodo (text: string): Promise<void> {
    await userEvent.type(this.todoInput, text)
  }
}
