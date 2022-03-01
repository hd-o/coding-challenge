/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { App } from '/src/app'
import { render } from '@testing-library/react'

describe('UI render', () => {
  test('App snapshot', async () => {
    const app = render(<App />)
    expect(app.asFragment()).toMatchSnapshot('app-render')
  })
})
