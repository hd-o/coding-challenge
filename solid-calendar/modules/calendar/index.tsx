import { createContext, useContext } from 'react'
import { CalendarMonthSelectorCtx } from '~/calendar/month/selector'
import { MuiBoxCtx } from '~/pkg/mui/Box'
import { ReminderEditorCtx } from '~/reminder/editor'
import { ReminderListCtx } from '~/reminder/list'
import { CalendarGridCtx } from './grid'
import { CalendarGridHeaderCtx } from './grid/header'

function Calendar (): JSX.Element {
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
