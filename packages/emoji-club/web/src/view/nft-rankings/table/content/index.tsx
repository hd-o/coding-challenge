import { rows } from '/src/view/nft-rankings/table/footer'
import {
  NFTRankingsTableHead, RequestSortHandler, SortOrder
} from '/src/view/nft-rankings/table/head'
import { FC, useState } from 'react'
import { useIntl } from 'react-intl'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'

export const NFTRankingsTableContent: FC = () => {
  const [order, setOrder] = useState<SortOrder>('asc')
  const [orderBy, setOrderBy] = useState('calories')

  const [page] = useState(0)
  const [rowsPerPage] = useState(5)

  const intl = useIntl()

  const handleRequestSort: RequestSortHandler = (event, property): void => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const emptyRows =
    // Avoid a layout jump when reaching the last page with empty rows
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Table stickyHeader aria-labelledby='tableTitle' >
      <NFTRankingsTableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
      <TableBody>
        {rows
          .map((row, index) => (
            <TableRow hover tabIndex={-1} key={index}>
              <TableCell sx={{ padding: '5px 5px 10px 15px' }}>{index}</TableCell>
              <TableCell sx={{ padding: '5px 5px 10px' }}>{row.token}</TableCell>
              <TableCell sx={{ padding: '5px 5px 10px' }}>
                {intl.formatNumber(row.transfers)}
              </TableCell>
            </TableRow>
          ))}
        {emptyRows > 0 && (
          <TableRow sx={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
