import 'reflect-metadata'
import { useContext } from 'react'
import { AppCtx } from '~/app'
import { NextHeadCtx } from '~/pkg/next/head'

export default function IndexPage (): JSX.Element {
  const App = useContext(AppCtx)
  const Head = useContext(NextHeadCtx)

  return (
    <div>
      <Head>
        {/* icon by https://www.flaticon.com/authors/bqlqn */}
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='64x64' href='/icons/favicon-64x64.png' />
        <title>
          Virtual Elevators
        </title>
      </Head>
      <App />
    </div>
  )
}
