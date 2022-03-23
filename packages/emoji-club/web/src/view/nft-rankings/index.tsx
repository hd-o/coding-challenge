import { LayoutCtx } from '/src/layout'
import { createContext, FC, useContext } from 'react'
import { NFTRankingsActionsCtx } from './actions'
import { NFTRankingsSelectCtx } from './select'
import { NFTRankingsTableCtx } from './table'

const NFTRankings: FC = () => {
  const Layout = useContext(LayoutCtx)
  const NFTRankingsActions = useContext(NFTRankingsActionsCtx)
  const NFTRankingsSelect = useContext(NFTRankingsSelectCtx)
  const NFTRankingsTable = useContext(NFTRankingsTableCtx)

  return (
    <Layout>
      <NFTRankingsSelect />
      <NFTRankingsTable />
      <NFTRankingsActions />
    </Layout>
  )
}

export const NFTRankingsCtx = createContext(NFTRankings)
