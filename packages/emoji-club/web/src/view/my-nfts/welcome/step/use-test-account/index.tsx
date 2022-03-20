import accounts from '/../ethereum/hardhat-accounts.json'
import { LayoutSectionCtx } from '/src/layout/section'
import { LayoutSectionHeaderCtx } from '/src/layout/section/header'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'

const accountKeys = Object
  .keys(accounts)
  .map((address) => accounts[address as keyof typeof accounts].privateKey)

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

const MyNFTsWelcomeStepUseTestAccount: FC = () => {
  const LayoutSection = useContext(LayoutSectionCtx)
  const LayoutSectionHeader = useContext(LayoutSectionHeaderCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useIntl()

  return (
    <LayoutSection>
      <LayoutSectionHeader>
        <strong>
          {intl.formatMessage({ id: intlIds.myNFTsWelcomeStepUseTestAccounts })}
        </strong>
        <br />
      </LayoutSectionHeader>
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
        {intl.formatMessage({ id: intlIds.myNFTsWelcomeAccountWarning })}
        <br />
      </Typography>
    </LayoutSection>
  )
}

export const MyNFTsWelcomeStepUseTestAccountCtx =
  createContext(MyNFTsWelcomeStepUseTestAccount)
