import { useContext } from 'react'
import { AppCtx } from '../modules/app/'

export default function IndexPage() {
  const App = useContext(AppCtx)
  return <App />
}
