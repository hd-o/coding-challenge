import type { NextPage } from 'next'
import { MyNFTsWelcomeCtx } from '/src/view/my-nfts/welcome'
import { useContext } from 'react'
import { LayoutCtx } from '../src/layout'

const Index: NextPage = () => {
  const Layout = useContext(LayoutCtx)
  const MyNFTsWelcome = useContext(MyNFTsWelcomeCtx)

  return (
    <>
      <Layout>
        <MyNFTsWelcome />
      </Layout>
    </>
  )
}

export default Index
