/**
 * @jest-environment jsdom
 */
import 'reflect-metadata'
import '@testing-library/jest-dom'
import { App } from '/src/app'
import { container } from 'tsyringe'
import { render, screen } from '@testing-library/react'
import { TestUtil } from './util'

let util: TestUtil

beforeEach(() => {
  container.clearInstances()
  util = container.resolve(TestUtil)
  render(<App />)
})

describe('To-Do App', () => {
  test('App snapshot', () => {
    const app = render(<App />)
    expect(app.asFragment()).toMatchSnapshot('app')
  })
  describe('Add To-Do', () => {
    test('to-do input submit', async () => {
      await util.submitTodo(util.mockValues[0])
      const todo = screen.getByText(util.mockValues[0])
      expect(todo).toBeDefined()
      expect(util.todoInput).toHaveTextContent('')
    })
    test('add to-do button', async () => {
      await util.addTodo(util.mockValues[0])
      const todo = screen.getByText(util.mockValues[0])
      expect(todo).toBeDefined()
      expect(util.todoInput).toHaveTextContent('')
    })
  })
  describe('Toggle To-Do', () => {
    test('toggle to-do', async () => {
      await util.addTodo(util.mockValues[0])
      await util.toggleTodo(util.mockValues[0])
      const toggled = screen.getByText('🟢')
      expect(toggled).toBeDefined()
    })
    test('to-do is toggled individually', async () => {
      await util.addTodo(util.mockValues[0])
      await util.addTodo(util.mockValues[1])
      await util.toggleTodo(util.mockValues[0])
      // getByText should find only 1 item
      const toggled = screen.getByText('🟢')
      expect(toggled).toBeDefined()
    })
  })
  describe('Delete To-Do', () => {
    test('delete to-do', async () => {
      await util.addTodo(util.mockValues[0])
      const todo = screen.getByText(util.mockValues[0])
      expect(todo).toBeDefined()
      await util.deleteTodo(util.mockValues[0])
      const todoNotFound = util.todoNotFound(util.mockValues[0])
      expect(todoNotFound).toBe(true)
    })
    test('todo should be deleted individually', async () => {
      await util.addTodo(util.mockValues[0])
      await util.addTodo(util.mockValues[1])
      await util.deleteTodo(util.mockValues[0])
      const todoNotFound = util.todoNotFound(util.mockValues[0])
      expect(todoNotFound).toBe(true)
      const todo2 = screen.getByText(util.mockValues[1])
      expect(todo2).toBeDefined()
    })
  })
})
