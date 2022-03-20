import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiTableCellCtx } from '/src/pkg/mui/TableCell'
import { MuiTableHeadCtx } from '/src/pkg/mui/TableHead'
import { MuiTableRowCtx } from '/src/pkg/mui/TableRow'
import { MuiTableSortLabelCtx } from '/src/pkg/mui/TableSortLabel'
import { createContext, FC, MouseEvent, MouseEventHandler, useContext } from 'react'

export type SortOrder = 'desc' | 'asc' | undefined

export type RequestSortHandler = (e: MouseEvent, property: string) => void

type NewSortHandler = (property: string) => MouseEventHandler

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

interface Props {
  onRequestSort: RequestSortHandler
  order: SortOrder
  orderBy: string
}

const NFTRankingsTableHead: FC<Props> = (props) => {
  const { order, orderBy } = props

  const Box = useContext(MuiBoxCtx)
  const TableCell = useContext(MuiTableCellCtx)
  const TableHead = useContext(MuiTableHeadCtx)
  const TableRow = useContext(MuiTableRowCtx)
  const TableSortLabel = useContext(MuiTableSortLabelCtx)

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

export const NFTRankingsTableHeadCtx = createContext(NFTRankingsTableHead)
