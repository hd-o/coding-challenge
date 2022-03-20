import accounts from '/../ethereum/hardhat-accounts.json'
import { createContext, FC, useContext } from 'react'
import { Button } from '@mui/material'
import { MuiTypographyCtx } from '../../../pkg/mui/Typography'

const accountKeys = Object
  .keys(accounts)
  .map((address) => accounts[address as keyof typeof accounts].privateKey)

// declare let window: any

const Section: FC = (props) => {
  const Typography = useContext(MuiTypographyCtx)

  return (
    <Typography variant='body1' sx={{ paddingTop: '10px' }}>
      {props.children}
    </Typography>
  )
}

const Ul: FC = (props) => (
  <ul style={{ padding: 0, margin: 0, width: '100%' }}>
    {props.children}
  </ul>
)

const Li: FC = (props) => (
  <li
    style={{
      border: '1px dashed #555',
      marginTop: '10px',
      overflow: 'auto',
      padding: '5px',
      width: '100%',
    }}
  >
    {props.children}
  </li>
)

const MyNFTsWelcome: FC = () => {
  const Typography = useContext(MuiTypographyCtx)

  return (
    <>
      <Section>
        Welcome to Emoji Club, a Full Stack NFT Dapp!
        <br />
      </Section>

      <Section>
        🔗 <strong>1. Connect to <code>localhost:8545</code></strong>
      </Section>

      <Ul>
        <a
          href='/image/brave_wallet_localhost.png'
          target='_blank' rel="noreferrer"
        >
          <Li>
            • 🦁 BraveWallet
          </Li>
        </a>
        <a
          href='https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node'
          target='_blank' rel="noreferrer"
        >
          <Li>
            • 🦊 MetaMask
          </Li>
        </a>
      </Ul>

      <Section>
        <strong>🔑 2. Use a test account private key</strong>
        <br />
      </Section>

      <Ul>
        {
          accountKeys.map(address => (
            <Li key={address}>
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

      <Section>
        <strong>✨ 3. Connect your wallet</strong>
        <br />
      </Section>

      <Button variant="contained" sx={{ marginTop: '10px' }}>
        Connect Wallet
      </Button>
    </>
  )
}

export const MyNFTsWelcomeCtx = createContext(MyNFTsWelcome)
