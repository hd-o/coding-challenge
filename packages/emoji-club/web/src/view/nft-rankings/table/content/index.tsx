import { MuiTableCtx } from '/src/pkg/mui/Table'
import { MuiTableBodyCtx } from '/src/pkg/mui/TableBody'
import { MuiTableCellCtx } from '/src/pkg/mui/TableCell'
import { MuiTableRowCtx } from '/src/pkg/mui/TableRow'
import { rows } from '/src/view/nft-rankings/table/footer'
import {
  NFTRankingsTableHeadCtx, RequestSortHandler, SortOrder
} from '/src/view/nft-rankings/table/head'
import { createContext, FC, useContext, useState } from 'react'
import { useIntl } from 'react-intl'

const NFTRankingsTableContent: FC = () => {
  const NFTRankingsTableHead = useContext(NFTRankingsTableHeadCtx)
  const Table = useContext(MuiTableCtx)
  const TableBody = useContext(MuiTableBodyCtx)
  const TableCell = useContext(MuiTableCellCtx)
  const TableRow = useContext(MuiTableRowCtx)

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

export const NFTRankingsTableContentCtx = createContext(NFTRankingsTableContent)
