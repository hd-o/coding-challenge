import { createContext, useContext } from 'react'
import { LodashRangeCtx } from '~/pkg/lodash/range'
import { MuiGridCtx } from '~/pkg/mui/Grid'
import { MuiTypographyCtx } from '~/pkg/mui/Typography'
import { ReactIntlUseIntlCtx } from '~/pkg/react-intl/useIntl'
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
                color: '#ffffff'
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
