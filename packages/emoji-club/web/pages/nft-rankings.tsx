import type { NextPage } from 'next'
import { NFTRankingsCtx } from '/src/view/nft-rankings'
import { useContext } from 'react'

const NFTRankings: NextPage = () => {
  const NFTRankings = useContext(NFTRankingsCtx)
  return <NFTRankings />
}

export default NFTRankings
