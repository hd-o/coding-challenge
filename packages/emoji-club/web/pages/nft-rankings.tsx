import type { NextPage } from 'next'
import { LayoutCtx } from '/src/layout'
import { NFTRankingsCtx } from '/src/view/nft-rankings'
import { useContext } from 'react'

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
