import { LayoutSection } from '/src/layout/section'
import { LayoutSectionHeader } from '/src/layout/section/header'
import { intlIds } from '/src/util/intl-messages'
import { useResolve } from '/src/util/use-resolve'
import { useResolve$ } from '/src/util/use-resolve-stream'
import { useWeb3AccountsRequest$ } from '/src/web3/accounts/request/stream'
import { useWeb3Accounts$ } from '/src/web3/accounts/stream'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { LoadingButton } from '@mui/lab'

export const MyNFTsWelcomeStepConnectWallet: FC = () => {
  const accountsRequest$ = useResolve(useWeb3AccountsRequest$)
  const accountsState = useResolve$(useWeb3Accounts$)

  const intl = useIntl()

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
