import accounts from '/../ethereum/hardhat-accounts.json'
import { LayoutSection } from '/src/layout/section'
import { LayoutSectionHeader } from '/src/layout/section/header'
import { intlIds } from '/src/util/intl-messages'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { List, ListItem, Typography } from '@mui/material'

const accountKeys = Object
  .keys(accounts)
  .map((address) => accounts[address as keyof typeof accounts].privateKey)

const Ul: FC = (props) => (
  <List style={{ padding: 0, margin: 0, width: '100%', transform: 'translateX(-2px)' }}>
    {props.children}
  </List>
)

const Li: FC = (props) => (
  <ListItem
    sx={{
      background: theme => theme.app.textListItem,
      borderRadius: '3px',
      marginTop: '6px',
      overflow: 'auto',
      padding: '5px',
      width: '100%',
    }}
  >
    {props.children}
  </ListItem>
)

export const MyNFTsWelcomeStepUseTestAccount: FC = () => {
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
