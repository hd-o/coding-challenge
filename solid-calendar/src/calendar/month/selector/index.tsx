import { JotaiUseAtomCtx } from '/src/pkg/jotai/useAtom'
import { MuiIconArrowLeftCtx } from '/src/pkg/mui/icon/ArrowLeft'
import { MuiIconArrowRightCtx } from '/src/pkg/mui/icon/ArrowRight'
import { MuiIconButtonCtx } from '/src/pkg/mui/IconButton'
import { MuiMobileDatePickerCtx } from '/src/pkg/mui/MobileDatePicker'
import { MuiStackCtx } from '/src/pkg/mui/Stack'
import { MuiTextFieldCtx } from '/src/pkg/mui/TextField'
import { createContext, useContext } from 'react'
import { CSSObject } from '@emotion/serialize'
import { Theme, useTheme } from '@mui/system'
import { CalendarMonthAtomCtx } from '../atom'
import { HandleDateChangeCtx } from './handleDateChange'
import { HandleNextMonthCtx } from './handleNextMonth'
import { HandlePreviousMonthCtx } from './handlePreviousMonth'

const iconButtonStyles: CSSObject = {
  '& .MuiTouchRipple-root': {
    margin: 0,
  },
}

const textFieldStyles = (theme: Theme): CSSObject => ({
  display: 'contents',
  [`& .MuiFilledInput-root:before,
    & .MuiFilledInput-root:after`
  ]: {
    border: 'none',
  },
  '& > div': {
    background: 'transparent',
    marginLeft: theme.spacing(1.5),
  },
  '& input': {
    padding: '0 10px',
  },
})

function CalendarMonthSelector (): JSX.Element {
  const ArrowLeftIcon = useContext(MuiIconArrowLeftCtx)
  const ArrowRightIcon = useContext(MuiIconArrowRightCtx)
  const IconButton = useContext(MuiIconButtonCtx)
  const MobileDatePicker = useContext(MuiMobileDatePickerCtx)
  const Stack = useContext(MuiStackCtx)
  const TextField = useContext(MuiTextFieldCtx)

  const handleDateChange = useContext(HandleDateChangeCtx)()
  const handleNextMonth = useContext(HandleNextMonthCtx)()
  const handlePreviousMonth = useContext(HandlePreviousMonthCtx)()
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
      <MobileDatePicker
        value={calendarMonth}
        onChange={date => {
          if (date !== null) handleDateChange(date)
        }}
        views={['year', 'month']}
        renderInput={(params) =>
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              'data-testid': 'calendar-month-selector-date',
            }}
            sx={textFieldStyles(theme)}
          />
        }
      />
    </Stack>
  )
}

export const CalendarMonthSelectorCtx = createContext(CalendarMonthSelector)
