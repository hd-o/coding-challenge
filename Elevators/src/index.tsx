import 'reflect-metadata'
import './debug'
import { render } from 'react-dom'
import { App } from './component/App'
import { ContextProvider } from './model/Context/Provider'

render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root'),
)
