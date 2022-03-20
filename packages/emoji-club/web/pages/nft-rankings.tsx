import type { NextPage } from 'next'
import { NFTRankingsCtx } from '/src/view/nft-rankings'
import { useContext } from 'react'
import { LayoutCtx } from '../src/layout'

const NFTRankings: NextPage = () => {
  const Layout = useContext(LayoutCtx)
  const NFTRankings = useContext(NFTRankingsCtx)

  return (
    <>
      <Layout>
        <NFTRankings />
      </Layout>
    </>
  )
}

export default NFTRankings
