import { Layout } from '/src/layout'
import { FC } from 'react'
import { NFTRankingsActions } from './actions'
import { NFTRankingsSelect } from './select'
import { NFTRankingsTable } from './table'

export const NFTRankings: FC = () => {
  return (
    <Layout>
      <NFTRankingsSelect />
      <NFTRankingsTable />
      <NFTRankingsActions />
    </Layout>
  )
}
