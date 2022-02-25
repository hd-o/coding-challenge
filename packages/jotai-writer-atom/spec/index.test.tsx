/**
 * @jest-environment jsdom
 */
import { App } from '/src/app'
import { CountAtomCtx } from '/src/count/atom'
import { atom } from 'jotai'
import { fireEvent, render, screen } from '@testing-library/react'

beforeEach(() => {
  render(
    <CountAtomCtx.Provider value={atom(0)}>
      <App />
    </CountAtomCtx.Provider>
  )
})

describe('Counter App', () => {
  test('counter increments', () => {
    const [incrementBtn] = screen.getAllByText('Increment')
    fireEvent.click(incrementBtn)
    const [countTxt] = screen.getAllByText('Count: 1')
    expect(countTxt).toBeDefined()
  })
  test('counters increment individually', () => {
    const [incrementBtn1, incrementBtn2] = screen.getAllByText('Increment')
    fireEvent.click(incrementBtn1)
    fireEvent.click(incrementBtn1)
    fireEvent.click(incrementBtn2)
    const [countTxt1] = screen.getAllByText('Count: 2')
    const [countTxt2] = screen.getAllByText('Count: 1')
    expect(countTxt1).toBeDefined()
    expect(countTxt2).toBeDefined()
  })
})
