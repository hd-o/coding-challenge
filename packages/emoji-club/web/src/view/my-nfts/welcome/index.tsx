import { LayoutSection } from '/src/layout/section'
import { LayoutSectionHeader } from '/src/layout/section/header'
import { intlIds } from '/src/util/intl-messages'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { MyNFTsWelcomeStepConnectLocalhost } from './step/connect-localhost'
import { MyNFTsWelcomeStepConnectWallet } from './step/connect-wallet'
import { MyNFTsWelcomeStepUseTestAccount } from './step/use-test-account'

export const MyNFTsWelcome: FC = () => {
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
