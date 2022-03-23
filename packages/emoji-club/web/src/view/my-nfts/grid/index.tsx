import { useResolve$ } from '/src/util/use-resolve-stream'
import { useWeb3Accounts$ } from '/src/web3/accounts/stream'
import { createContext, FC } from 'react'

const MyNFTsGrid: FC = () => {
  const accountsState = useResolve$(useWeb3Accounts$)

  return (
    <pre>
      {JSON.stringify(accountsState, null, 2)}
    </pre>
  )
}

export const MyNFTsGridCtx = createContext(MyNFTsGrid)
