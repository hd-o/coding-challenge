/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { App } from '../app'
import { fnContainer } from '../function/container'
import { useFloorWasRequested } from './util/ui/floorWasRequested'
import { useGetFloorCaller } from './util/ui/getFloorCaller'

let floorWasRequested: ReturnType<typeof useFloorWasRequested>
let getFloorCaller: ReturnType<typeof useGetFloorCaller>

beforeEach(() => {
  fnContainer.reset()
  floorWasRequested = fnContainer.resolve(useFloorWasRequested)
  getFloorCaller = fnContainer.resolve(useGetFloorCaller)
})

describe('UI render', () => {
  test('App snapshot', async () => {
    const app = render(<App />)
    expect(app.asFragment()).toMatchSnapshot('app-render')
  })
  test('floor panel request', async () => {
    render(<App />)
    const caller = getFloorCaller('floor-panel', 1)
    fireEvent.click(caller)
    expect(await floorWasRequested(1)).toBe(true)
  })
  test('elevator panel request', async () => {
    render(<App />)
    const [elevatorPanel] = screen.getAllByTestId(/elevator-\d-panel/)
    const { testid = '' } = elevatorPanel.dataset
    const caller = getFloorCaller(testid, 1)
    fireEvent.click(caller)
    expect(await floorWasRequested(1, testid)).toBe(true)
  })
})
