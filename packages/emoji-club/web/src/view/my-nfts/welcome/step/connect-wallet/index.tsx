import { LayoutSectionCtx } from '/src/layout/section'
import { LayoutSectionHeaderCtx } from '/src/layout/section/header'
import { MuiLoadingButtonCtx } from '/src/pkg/mui/LoadingButton'
import { intlIds } from '/src/util/intl-messages'
import { useResolve } from '/src/util/use-resolve'
import { useResolve$ } from '/src/util/use-resolve-stream'
import { useWeb3AccountsRequest$ } from '/src/web3/accounts/request/stream'
import { useWeb3Accounts$ } from '/src/web3/accounts/stream'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'

const MyNFTsWelcomeStepConnectWallet: FC = () => {
  const LayoutSection = useContext(LayoutSectionCtx)
  const LayoutSectionHeader = useContext(LayoutSectionHeaderCtx)
  const LoadingButton = useContext(MuiLoadingButtonCtx)

  const accountsRequest$ = useResolve(useWeb3AccountsRequest$)
  const accountsState = useResolve$(useWeb3Accounts$)

  const intl = useIntl()

  // useEffect(() => {
  //   accountsRequest$.next()
  // })

  return (
    <LayoutSection>
      <LayoutSectionHeader>
        <strong>
          {intl.formatMessage({ id: intlIds.myNFTsWelcomeStepConnectWallet })}
        </strong>
        <br />
      </LayoutSectionHeader>
      <LoadingButton
        color='primary'
        disabled={accountsState.requesting}
        loading={accountsState.requesting}
        onClick={() => accountsRequest$.next()}
        sx={{ marginTop: '10px' }}
        variant='contained'
      >
        {intl.formatMessage({ id: intlIds.connectWallet })}
      </LoadingButton>
    </LayoutSection>
  )
}

export const MyNFTsWelcomeStepConnectWalletCtx =
  createContext(MyNFTsWelcomeStepConnectWallet)
