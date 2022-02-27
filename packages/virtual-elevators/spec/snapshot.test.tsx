/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { App } from '/src/app'
import { render } from '@testing-library/react'

test('app snapshot', () => {
  const app = render(<App />)
  expect(app.asFragment()).toMatchSnapshot('app')
})
