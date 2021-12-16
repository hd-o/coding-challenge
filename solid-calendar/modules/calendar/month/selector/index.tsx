import { createContext, useContext } from 'react'
import { YearMonthFormatCtx } from '~/date/format/yearMonth'
import { DateFnsFormatCtx } from '~/pkg/date-fns/format'
import { JotaiUseAtomCtx } from '~/pkg/jotai/useAtom'
import { MuiIconArrowLeftCtx } from '~/pkg/mui/icon/ArrowLeft'
import { MuiIconArrowRightCtx } from '~/pkg/mui/icon/ArrowRight'
import { MuiIconButtonCtx } from '~/pkg/mui/IconButton'
import { MuiStackCtx } from '~/pkg/mui/Stack'
import { MuiTextFieldCtx } from '~/pkg/mui/TextField'
import { ValueHandlerCtx } from '~/util/valueHandler'
import { CSSObject } from '@emotion/serialize'
import { Theme, useTheme } from '@mui/system'
import { CalendarMonthAtomCtx } from '../atom'
import { HandleDateChangeCtx } from './handleDateChange'
import { HandleNextMonthCtx } from './handleNextMonth'
import { HandlePreviousMonthCtx } from './handlePreviousMonth'

const iconButtonStyles: CSSObject = {
  '& .MuiTouchRipple-root': {
    margin: 0
  }
}

const textFieldStyles = (theme: Theme): CSSObject => ({
  display: 'contents',
  [`& .MuiFilledInput-root:before,
    & .MuiFilledInput-root:after`
  ]: {
    border: 'none'
  },
  '& > div': {
    background: 'transparent',
    marginLeft: theme.spacing(1.5)
  },
  '& input': {
    padding: '0 10px'
  }
})

function CalendarMonthSelector (): JSX.Element {
  const ArrowLeftIcon = useContext(MuiIconArrowLeftCtx)
  const ArrowRightIcon = useContext(MuiIconArrowRightCtx)
  const IconButton = useContext(MuiIconButtonCtx)
  const Stack = useContext(MuiStackCtx)
  const TextField = useContext(MuiTextFieldCtx)

  const format = useContext(DateFnsFormatCtx)
  const handleDateChange = useContext(HandleDateChangeCtx)()
  const handleNextMonth = useContext(HandleNextMonthCtx)()
  const handlePreviousMonth = useContext(HandlePreviousMonthCtx)()
  const useValueHandler = useContext(ValueHandlerCtx)
  const yearMonthFormat = useContext(YearMonthFormatCtx)
  const useAtom = useContext(JotaiUseAtomCtx)
  const theme = useTheme()
  const calendarMonth = useAtom(useContext(CalendarMonthAtomCtx)())[0]

  return (
    <Stack
      className='js-calendar-month-selector'
      direction="row"
      margin='5px 0'
      spacing={1}
    >
      <IconButton
        data-testid='calendar-month-selector-previous'
        onClick={handlePreviousMonth}
        sx={iconButtonStyles}
      >
        <ArrowLeftIcon />
      </IconButton>
      <IconButton
        data-testid='calendar-month-selector-next'
        onClick={handleNextMonth}
        sx={iconButtonStyles}
      >
        <ArrowRightIcon />
      </IconButton>
      <TextField
        inputProps={{
          'data-testid': 'calendar-month-selector-date'
        }}
        onChange={useValueHandler(handleDateChange)}
        sx={textFieldStyles(theme)}
        type="month"
        variant='filled'
        value={format(calendarMonth, yearMonthFormat)}
      />
    </Stack>
  )
}

export const CalendarMonthSelectorCtx = createContext(CalendarMonthSelector)
