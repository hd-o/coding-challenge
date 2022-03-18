import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Box, Button, Typography } from '@mui/material'
import { NFTRankingsSelectCtx } from './select'
import { NFTRankingsTableCtx } from './table'

const NFTRankings: FC = () => {
  const NFTRankingsSelect = useContext(NFTRankingsSelectCtx)
  const NFTRankingsTable = useContext(NFTRankingsTableCtx)

  const intl = useIntl()

  const lastUpdatedDate = new Date()

  const lastUpdated = intl.formatDate(lastUpdatedDate, {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })

  return (
    <>
      <NFTRankingsSelect />
      <NFTRankingsTable />
      <Box
        marginTop={1}
      >
        <Typography
          color='text.disabled'
          title={intl.formatDate(lastUpdatedDate)}
          variant='caption'
        >
          Last updated:
          {lastUpdated}
        </Typography>
      </Box>
      <Box marginTop={1}>
        <Button
          color='info'
          startIcon='👀'
          variant='outlined'
          href='https://etherscan.io/tokens-nft1155'
          target='_blank'
        >
          See more at Etherscan
        </Button>
      </Box>
    </>
  )
}

export const NFTRankingsCtx = createContext(NFTRankings)
