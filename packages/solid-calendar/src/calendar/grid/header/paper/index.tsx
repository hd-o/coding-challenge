import { createContext, useContext } from 'react'
import { PaperProps, useTheme } from '@mui/material'
import { CalendarGridPaperCtx } from '../../paper'

function CalendarGridHeaderPaper (props: PaperProps): JSX.Element {
  const CalendarGridPaper = useContext(CalendarGridPaperCtx)
  const theme = useTheme()

  return <CalendarGridPaper
    sx={{
      padding: theme.spacing(0.6),
      textAlign: 'center',
      background: '#2f74b5',
      color: '#ffffff',
      ...props.sx,
    }}
  />
}

export const CalendarGridHeaderPaperCtx = createContext(CalendarGridHeaderPaper)
