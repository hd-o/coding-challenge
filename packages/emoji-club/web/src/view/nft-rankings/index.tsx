import { createContext, FC, useContext } from 'react'
import { NFTRankingsActionsCtx } from './actions'
import { NFTRankingsSelectCtx } from './select'
import { NFTRankingsTableCtx } from './table'

const NFTRankings: FC = () => {
  const NFTRankingsActions = useContext(NFTRankingsActionsCtx)
  const NFTRankingsSelect = useContext(NFTRankingsSelectCtx)
  const NFTRankingsTable = useContext(NFTRankingsTableCtx)

  return (
    <>
      <NFTRankingsSelect />
      <NFTRankingsTable />
      <NFTRankingsActions />
    </>
  )
}

export const NFTRankingsCtx = createContext(NFTRankings)
