import { CalendarMonthSelectorCtx } from '/src/calendar/month/selector'
import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { ReminderEditorCtx } from '/src/reminder/editor'
import { ReminderListCtx } from '/src/reminder/list'
import { createContext, useContext } from 'react'
import { CalendarGridCtx } from './grid'
import { CalendarGridHeaderCtx } from './grid/header'

function Calendar(): JSX.Element {
  const Box = useContext(MuiBoxCtx)
  const Grid = useContext(CalendarGridCtx)
  const GridHeader = useContext(CalendarGridHeaderCtx)
  const MonthSelector = useContext(CalendarMonthSelectorCtx)
  const ReminderEditor = useContext(ReminderEditorCtx)
  const ReminderList = useContext(ReminderListCtx)

  return (
    <>
      <MonthSelector />
      <Box>
        <GridHeader />
        <Grid />
      </Box>
      <ReminderEditor />
      <ReminderList />
    </>
  )
}

export const CalendarCtx = createContext(Calendar)
