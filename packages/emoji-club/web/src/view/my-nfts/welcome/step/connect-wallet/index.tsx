import { LayoutSectionCtx } from '/src/layout/section'
import { LayoutSectionHeaderCtx } from '/src/layout/section/header'
import { MuiButtonCtx } from '/src/pkg/mui/Button'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'

const MyNFTsWelcomeStepConnectWallet: FC = () => {
  const Button = useContext(MuiButtonCtx)
  const LayoutSection = useContext(LayoutSectionCtx)
  const LayoutSectionHeader = useContext(LayoutSectionHeaderCtx)

  const intl = useIntl()

  return (
    <LayoutSection>
      <LayoutSectionHeader>
        <strong>
          {intl.formatMessage({ id: intlIds.myNFTsWelcomeStepConnectWallet })}
        </strong>
        <br />
      </LayoutSectionHeader>
      <Button
        color='primary'
        variant='contained'
        sx={{ marginTop: '10px' }}
      >
        {intl.formatMessage({ id: intlIds.connectWallet })}
      </Button>
    </LayoutSection>
  )
}

export const MyNFTsWelcomeStepConnectWalletCtx =
  createContext(MyNFTsWelcomeStepConnectWallet)
