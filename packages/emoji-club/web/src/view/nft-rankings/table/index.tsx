import { FC } from 'react'
import { Box, Paper, TableContainer } from '@mui/material'
import { NFTRankingsTableContent } from './content'
import { NFTRankingsTableFooter } from './footer'

export const NFTRankingsTable: FC = () => {
  return (
    <Box sx={{ width: '100%', marginTop: 1 }}>
      <Paper elevation={0} sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 300 }}>
          <NFTRankingsTableContent />
          <NFTRankingsTableFooter />
        </TableContainer>
      </Paper>
    </Box>
  )
}
