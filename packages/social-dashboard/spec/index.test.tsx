import en from '/lang/en-US.json'
import Index from '/pages'
import { AppContainer } from '/src/app'
import { render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { dragAndDrop } from './util/drag-and-drop'

let index: RenderResult

beforeEach(() => {
  index = render(
    <AppContainer
      Component={Index}
      cookie=''
      pageProps={{}}
      intl={{ locale: 'en-US', messages: en }}
    />
  )
})

describe('Counter App', () => {
  test('desktop interface snapshot', () => {
    expect(index.asFragment()).toMatchSnapshot('desktop-snapshot')
  })
  test('mobile interface snapshot', () => {
    expect(index.asFragment()).toMatchSnapshot('mobile-snapshot')
  })
  test('theme (dark mode) toggle button', async () => {
    const themeToggleButton = await screen.findByText('Dark Mode')
    expect(index.asFragment()).toMatchSnapshot('dark-mode-snapshot')

    await userEvent.click(themeToggleButton)
    await screen.findByText('Light Mode')
    expect(index.asFragment()).toMatchSnapshot('light-mode-snapshot')

    await userEvent.click(themeToggleButton)
    await screen.findByText('Dark Mode')
    expect(index.asFragment()).toMatchSnapshot('dark-mode-snapshot')
  })
  test('dashboard cards drag & drop rearrange', async () => {
    const [card0, ,card2] = screen.getAllByTestId(/^social-card-\d$/)
    dragAndDrop(card2, card0)
    const [reorderedCard0, reorderedCard1] = screen.getAllByTestId(/^social-card-\d$/)
    expect(reorderedCard0.dataset.testid).toBe(card2.dataset.testid)
    expect(reorderedCard1.dataset.testid).toBe(card0.dataset.testid)
  })
})
