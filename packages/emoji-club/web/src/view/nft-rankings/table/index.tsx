import {
  ChangeEventHandler, createContext, FC, MouseEvent, MouseEventHandler, useState
} from 'react'
import { useIntl } from 'react-intl'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

interface Data {
  token: string
  transfers: number
}

const rows: Data[] = [
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

type SortOrder = 'desc' | 'asc' | undefined

const headCells = [
  {
    id: 'index',
    label: '#',
    sortable: false,
  },
  {
    id: 'token',
    label: 'Token',
    sortable: false,
  },
  {
    id: 'volume',
    label: 'Transfers (24H)',
    sortable: true,
  },
]

type RequestSortHandler = (e: MouseEvent, property: string) => void

interface NFTRankingTableHeadProps {
  onRequestSort: RequestSortHandler
  order: SortOrder
  orderBy: string
}

type NewSortHandler = (property: string) => MouseEventHandler

const NFTRankingsTableHead: FC<NFTRankingTableHeadProps> = (props) => {
  const { order, orderBy } = props

  const newSortHandler: NewSortHandler = (property) => (event) => {
    props.onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell
          key={headCells[0].id}
          sortDirection={orderBy === headCells[0].id ? order : false}
          sx={{
            padding: '10px 5px 10px 15px',
          }}
        >
          {headCells[0].label}
        </TableCell>
        {headCells.slice(1).map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              padding: '10px 5px 10px',
            }}
          >
            {
              !headCell.sortable && headCell.label
            }
            {
              headCell.sortable && (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={newSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {
                    orderBy === headCell.id &&
                    <Box component="span" sx={{ display: 'none' }}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  }
                </TableSortLabel>
              )
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const NFTRankingsTable: FC = () => {
  const [order, setOrder] = useState<SortOrder>('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const intl = useIntl()

  const handleRequestSort: RequestSortHandler = (event, property): void => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    // Avoid a layout jump when reaching the last page with empty rows
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%', marginTop: 1 }}>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
        }}
      >
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table
            stickyHeader
            aria-labelledby="tableTitle"
          >
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
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Page Size'
        />
      </Paper>
    </Box>
  )
}

export const NFTRankingsTableCtx = createContext(NFTRankingsTable)
