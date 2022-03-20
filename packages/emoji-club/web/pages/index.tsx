import type { NextPage } from 'next'
import { LayoutCtx } from '/src/layout'
import { MyNFTsWelcomeCtx } from '/src/view/my-nfts/welcome'
import { useContext } from 'react'

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
