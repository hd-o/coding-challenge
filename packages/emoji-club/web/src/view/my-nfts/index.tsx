import { LayoutCtx } from '/src/layout'
import { useResolve$ } from '/src/util/use-resolve-stream'
import { useWeb3Accounts$ } from '/src/web3/accounts/stream'
import { createContext, FC, useContext } from 'react'
import { MyNFTsGridCtx } from './grid'
import { MyNFTsWelcomeCtx } from './welcome'

const MyNFTs: FC = () => {
  const Layout = useContext(LayoutCtx)
  const MyNFTsGrid = useContext(MyNFTsGridCtx)
  const MyNFTsWelcome = useContext(MyNFTsWelcomeCtx)
  const accountsState = useResolve$(useWeb3Accounts$)

  return (
    <Layout>
      {
        accountsState.accounts.length > 0
          ? <MyNFTsGrid />
          : <MyNFTsWelcome />
      }
    </Layout>
  )
}

export const MyNFTsCtx = createContext(MyNFTs)
