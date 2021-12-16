import { createContext, useContext } from 'react'
import { MuiPaperCtx } from '~/pkg/mui/Paper'
import { PaperProps } from '@mui/material'

function CalendarGridPaper (props: PaperProps): JSX.Element {
  const Paper = useContext(MuiPaperCtx)
  return <Paper
    {...props}
    sx={{
      boxShadow: 'none',
      borderRadius: 0,
      ...props.sx
    }}
  />
}

export const CalendarGridPaperCtx = createContext(CalendarGridPaper)
