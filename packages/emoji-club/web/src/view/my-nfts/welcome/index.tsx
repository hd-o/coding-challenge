import { LayoutSectionCtx } from '/src/layout/section'
import { LayoutSectionHeaderCtx } from '/src/layout/section/header'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { MyNFTsWelcomeStepConnectLocalhostCtx } from './step/connect-localhost'
import { MyNFTsWelcomeStepConnectWalletCtx } from './step/connect-wallet'
import { MyNFTsWelcomeStepUseTestAccountCtx } from './step/use-test-account'

const MyNFTsWelcome: FC = () => {
  const LayoutSection = useContext(LayoutSectionCtx)
  const LayoutSectionHeader = useContext(LayoutSectionHeaderCtx)
  const MyNFTsWelcomeStepConnectLocalhost = useContext(MyNFTsWelcomeStepConnectLocalhostCtx)
  const MyNFTsWelcomeStepUseTestAccount = useContext(MyNFTsWelcomeStepUseTestAccountCtx)
  const MyNFTsWelcomeStepConnectWallet = useContext(MyNFTsWelcomeStepConnectWalletCtx)

  const intl = useIntl()

  return (
    <>
      <LayoutSection>
        <LayoutSectionHeader>
          {intl.formatMessage({ id: intlIds.myNFTsWelcomeSignIn })}
        </LayoutSectionHeader>
      </LayoutSection>
      <MyNFTsWelcomeStepConnectLocalhost />
      <MyNFTsWelcomeStepUseTestAccount />
      <MyNFTsWelcomeStepConnectWallet />
    </>
  )
}

export const MyNFTsWelcomeCtx = createContext(MyNFTsWelcome)
