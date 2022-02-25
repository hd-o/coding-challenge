import { LodashRangeCtx } from '/src/pkg/lodash/range'
import { MuiGridCtx } from '/src/pkg/mui/Grid'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { ReactIntlUseIntlCtx } from '/src/pkg/react-intl/useIntl'
import { createContext, useContext } from 'react'
import { useTheme } from '@mui/system'
import { CalendarGridPaperCtx } from '../paper'

function CalendarGridHeader (): JSX.Element {
  const CalendarGridPaper = useContext(CalendarGridPaperCtx)
  const Grid = useContext(MuiGridCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useContext(ReactIntlUseIntlCtx)()
  const range = useContext(LodashRangeCtx)
  const theme = useTheme()

  return (
    <Grid container>
      {
        range(0, 7).map(day => (
          <Grid item xs key={day}>
            <CalendarGridPaper
              sx={{
                padding: theme.spacing(0.6),
                textAlign: 'center',
                background: '#2f74b5',
                color: '#ffffff',
              }}
            >
              <Typography variant='body2'>
                { intl.formatMessage({ id: `weekday-${day}` }) }
              </Typography>
            </CalendarGridPaper>
          </Grid>
        ))
      }
    </Grid>
  )
}

export const CalendarGridHeaderCtx = createContext(CalendarGridHeader)
