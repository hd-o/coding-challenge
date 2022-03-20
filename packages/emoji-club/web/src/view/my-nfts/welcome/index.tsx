import accounts from '/../ethereum/hardhat-accounts.json'
import { LayoutSectionCtx } from '/src/layout/section'
import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiButtonCtx } from '/src/pkg/mui/Button'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { createContext, FC, useContext } from 'react'

const accountKeys = Object
  .keys(accounts)
  .map((address) => accounts[address as keyof typeof accounts].privateKey)

const SectionHeader: FC = (props) => {
  const Typography = useContext(MuiTypographyCtx)

  return (
    <Typography variant='body1'>
      {props.children}
    </Typography>
  )
}

const Ul: FC = (props) => (
  <ul style={{ padding: 0, margin: 0, width: '100%', transform: 'translateX(-2px)' }}>
    {props.children}
  </ul>
)

const Li: FC = (props) => (
  <li
    style={{
      background: '#111',
      border: '1px solid #252525',
      borderRadius: '3px',
      marginTop: '6px',
      overflow: 'auto',
      padding: '5px',
      width: '100%',
    }}
  >
    {props.children}
  </li>
)

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

const MyNFTsWelcome: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const Button = useContext(MuiButtonCtx)
  const LayoutSection = useContext(LayoutSectionCtx)
  const Typography = useContext(MuiTypographyCtx)

  const stepConnectToLocalhost = (
    <LayoutSection>
      <SectionHeader>
        📡 <strong>1. Connect to <code>localhost:8545</code></strong>
      </SectionHeader>
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

  const stepUseTestAccount = (
    <LayoutSection>
      <SectionHeader>
        <strong>🔑 2. Use a test account private key</strong>
        <br />
      </SectionHeader>
      <Ul>
        {
          accountKeys.map((address, index) => (
            <Li key={index}>
              {address}
              <br />
            </Li>
          ))
        }
      </Ul>
      <Typography variant='body1' sx={{ marginTop: '5px' }}>
        Do not use these accounts on mainnet!
        <br />
      </Typography>
    </LayoutSection>
  )

  const stepConnectWallet = (
    <LayoutSection>
      <SectionHeader>
        <strong>✨ 3. Connect your wallet</strong>
        <br />
      </SectionHeader>
      <Button
        color='primary'
        variant='contained'
        sx={{ marginTop: '10px' }}
      >
        Connect Wallet
      </Button>
    </LayoutSection>
  )

  return (
    <>
      <LayoutSection>
        <SectionHeader>
          👋 Welcome! Sign-in with Web3:
        </SectionHeader>
      </LayoutSection>
      {stepConnectToLocalhost}
      {stepUseTestAccount}
      {stepConnectWallet}
    </>
  )
}

export const MyNFTsWelcomeCtx = createContext(MyNFTsWelcome)
