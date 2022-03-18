import type { NextPage } from 'next'
import { LayoutCtx } from '/src/layout'
import { MyNFTsWelcomeCtx } from '/src/view/my-nfts/welcome'
import Head from 'next/head'
import { useContext } from 'react'

const Home: NextPage = () => {
  const Layout = useContext(LayoutCtx)
  const MyNFTsWelcome = useContext(MyNFTsWelcomeCtx)

  return (
    <>
      <Head>
        <title>😜 Emoji Club</title>
        <meta name='description' content='Full Stack Emoji NFT Dapp' />
      </Head>
      <Layout>
        <MyNFTsWelcome />
      </Layout>
    </>
  )
}

export default Home
