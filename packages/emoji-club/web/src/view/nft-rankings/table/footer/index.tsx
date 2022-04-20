import { ChangeEventHandler, FC, useState } from 'react'
import { useIntl } from 'react-intl'
import { Box, TableFooter, TablePagination, Typography } from '@mui/material'

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

export const NFTRankingsTableFooter: FC = () => {
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
