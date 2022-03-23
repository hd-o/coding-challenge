import type { NextPage } from 'next'
import { MyNFTsCtx } from '/src/view/my-nfts'
import { useContext } from 'react'

const Index: NextPage = () => {
  const MyNFTs = useContext(MyNFTsCtx)
  return <MyNFTs />
}

export default Index
