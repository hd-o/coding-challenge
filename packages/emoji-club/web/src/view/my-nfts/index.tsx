import { Layout } from '/src/layout'
import { useResolve$ } from '/src/util/use-resolve-stream'
import { useWeb3Accounts$ } from '/src/web3/accounts/stream'
import { FC } from 'react'
import { MyNFTsGrid } from './grid'
import { MyNFTsWelcome } from './welcome'

export const MyNFTs: FC = () => {
  const accountsState = useResolve$(useWeb3Accounts$)
  const accountsLength = accountsState.accounts?.length ?? 0

  return (
    <Layout>
      {
        accountsLength > 0
          ? <MyNFTsGrid />
          : <MyNFTsWelcome />
      }
    </Layout>
  )
}
