import { createContext, useContext } from 'react'
import { DateIsWeekendDayCtx } from '~/date/isWeekendDay'
import { DateFnsGetDayCtx } from '~/pkg/date-fns/getDay'
import { DateFnsGetDaysInMonthCtx } from '~/pkg/date-fns/getDaysInMonth'
import { DateFnsSetDateCtx } from '~/pkg/date-fns/setDate'
import { DateFnsStartOfMonthCtx } from '~/pkg/date-fns/startOfMonth'
import { JotaiUseAtomCtx } from '~/pkg/jotai/useAtom'
import { LodashConcatCtx } from '~/pkg/lodash/concat'
import { LodashFillCtx } from '~/pkg/lodash/fill'
import { LodashRangeCtx } from '~/pkg/lodash/range'
import { MuiGridCtx } from '~/pkg/mui/Grid'
import { useTheme } from '@mui/material'
import { CalendarMonthAtomCtx } from '../month/atom'
import { CalendarGridCellCtx } from './cell'
import { CalendarGridPaperCtx } from './paper'

function CalendarGrid (): JSX.Element {
  const CalendarGridCell = useContext(CalendarGridCellCtx)
  const CalendarGridPaper = useContext(CalendarGridPaperCtx)
  const Grid = useContext(MuiGridCtx)

  const concat = useContext(LodashConcatCtx)
  const fill = useContext(LodashFillCtx)
  const range = useContext(LodashRangeCtx)
  const getDay = useContext(DateFnsGetDayCtx)
  const getDaysInMonth = useContext(DateFnsGetDaysInMonthCtx)
  const setDate = useContext(DateFnsSetDateCtx)
  const startOfMonth = useContext(DateFnsStartOfMonthCtx)
  const isWeekendDay = useContext(DateIsWeekendDayCtx)()
  const useAtom = useContext(JotaiUseAtomCtx)
  const theme = useTheme()

  const calendarMonth = useAtom(useContext(CalendarMonthAtomCtx)())[0]
  const firstWeekDayOfMonth = getDay(startOfMonth(calendarMonth))
  const daysInMonth = getDaysInMonth(calendarMonth)

  // Always render empty cells to fill calendar grid space.
  // Is normally used in calendars to show the upcoming month's days
  const emptyTailCells = 35 - daysInMonth - firstWeekDayOfMonth
  const tailCells = emptyTailCells < 0 ? 7 - Math.abs(emptyTailCells) : emptyTailCells

  // Using null to fill the grid with empty cells
  const gridCells: Array<number|null> = concat(
    fill(Array(firstWeekDayOfMonth), null),
    range(1, daysInMonth + 1),
    fill(Array(tailCells), null))

  return (
    <Grid
      container
      display="grid"
      className='js-calendar-grid'
      // Grid width: 7 days / week
      gridTemplateColumns="repeat(7, 1fr)"
      sx={{
        marginTop: 0
      }}
    >
      {
        gridCells.map((day, index) => {
          const key = `${index}-${day === null ? 'blank' : 'day'}`
          return (
            <Grid
              item
              data-testid='calendar-grid-cell'
              data-key={key}
              key={key}
              sx={{
                width: '100%',
                paddingTop: '100%',
                background: day === null
                  ? '#e7e7e7'
                  : isWeekendDay(index) ? '#f2f2f2' : '#fefefe',
                color: isWeekendDay(index) ? '#6194be' : '#222222',
                border: '1px solid #dddddd',
                position: 'relative'
              }}
            >
              <CalendarGridPaper
                sx={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  color: 'inherit',
                  padding: theme.spacing(0.4),
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                { day !== null &&
                  <CalendarGridCell date={setDate(calendarMonth, day)} />
                }
              </CalendarGridPaper>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export const CalendarGridCtx = createContext(CalendarGrid)
