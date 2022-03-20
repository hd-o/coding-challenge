import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiPaperCtx } from '/src/pkg/mui/Paper'
import { MuiTableContainerCtx } from '/src/pkg/mui/TableContainer'
import { createContext, FC, useContext } from 'react'
import { NFTRankingsTableContentCtx } from './content'
import { NFTRankingsTableFooterCtx } from './footer'

const NFTRankingsTable: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const Paper = useContext(MuiPaperCtx)
  const TableContainer = useContext(MuiTableContainerCtx)
  const NFTRankingsTableContent = useContext(NFTRankingsTableContentCtx)
  const NFTRankingsTableFooter = useContext(NFTRankingsTableFooterCtx)

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

export const NFTRankingsTableCtx = createContext(NFTRankingsTable)
