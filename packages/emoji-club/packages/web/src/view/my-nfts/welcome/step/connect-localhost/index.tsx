import { LayoutSection } from '/src/layout/section'
import { LayoutSectionHeader } from '/src/layout/section/header'
import { intlIds } from '/src/util/intl-messages'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Box, Button } from '@mui/material'

interface WalletInfo {
  href: string
  title: string
}

const walletInfos: WalletInfo[] = [
  {
    title: '🦁 BraveWallet',
    href: '/image/brave_wallet_localhost.png',
  },
  {
    title: '🦊 MetaMask',
    href: 'https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node',
  },
]

export const MyNFTsWelcomeStepConnectLocalhost: FC = () => {
  const intl = useIntl()
  return (
    <LayoutSection>
      <LayoutSectionHeader>
        <strong>
          {intl.formatMessage(
            { id: intlIds.myNFTsWelcomeStepConnectLocalhost },
            { localhost: <code>localhost:8545</code> },
          )}
        </strong>
      </LayoutSectionHeader>
      <Box
        sx={{
          marginTop: 1,
          '& a:not(:first-of-type)': {
            marginLeft: 1,
          },
        }}
      >
        {
          walletInfos.map((info, index) => (
            <Button
              disableRipple
              color='secondary'
              href={info.href}
              key={index}
              target='_blank'
              rel='noreferrer'
              variant='contained'
            >
              {info.title}
            </Button>
          ))
        }
      </Box>
    </LayoutSection>
  )
}
