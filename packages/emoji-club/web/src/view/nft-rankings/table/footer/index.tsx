import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiTableFooterCtx } from '/src/pkg/mui/TableFooter'
import { MuiTablePaginationCtx } from '/src/pkg/mui/TablePagination'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { ChangeEventHandler, createContext, FC, useContext, useState } from 'react'
import { useIntl } from 'react-intl'

interface NFTRankingsData {
  token: string
  transfers: number
}

export const rows: NFTRankingsData[] = [
  {
    token: '🧁 Cupcake',
    transfers: 30500,
  },
  {
    token: '🍩 Donut',
    transfers: 45200,
  },
  {
    token: '🍄 Mushroom',
    transfers: 26200,
  },
]

const NFTRankingsTableFooter: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const TableFooter = useContext(MuiTableFooterCtx)
  const TablePagination = useContext(MuiTablePaginationCtx)
  const Typography = useContext(MuiTypographyCtx)

  const [page] = useState(0)
  const [rowsPerPage] = useState(5)

  const intl = useIntl()

  const lastUpdatedDate = new Date()

  const lastUpdated = intl.formatDate(lastUpdatedDate, {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement> = (_) => {
    // setRowsPerPage(parseInt(event.target.value, 10))
    // setPage(0)
  }

  return (
    <TableFooter
      component='div'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography
          color='text.disabled'
          title={`Last updated: ${intl.formatDate(lastUpdatedDate)}`}
          paddingLeft={1.5}
          paddingTop='0.5px'
          variant='body2'
        >
          {lastUpdated}
        </Typography>
      </Box>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={() => { }}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage='Page Size'
      />
    </TableFooter>
  )
}

export const NFTRankingsTableFooterCtx = createContext(NFTRankingsTableFooter)
