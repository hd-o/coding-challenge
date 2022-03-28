import { MuiFormControlLabelCtx } from '/src/pkg/mui/FormControlLabel'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { ColorsCtx } from '/src/styles/colors'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useAppThemeState } from '../state'
import { ThemeSwitchCtx } from '../switch'

const ThemeControl: FC = () => {
  const colors = useContext(ColorsCtx)
  const FormControlLabel = useContext(MuiFormControlLabelCtx)
  const Typography = useContext(MuiTypographyCtx)
  const ThemeSwitch = useContext(ThemeSwitchCtx)
  const [theme] = useAppThemeState()
  const intl = useIntl()

  return (
    <FormControlLabel
      value='start'
      control={<ThemeSwitch />}
      label={
        <Typography
          sx={{
            color: theme => colors[theme.text.secondary],
            fontWeight: 'bold',
          }}
          variant='caption'
        >
          {
            intl.formatMessage({
              id: theme === 'dark' ? intlIds.darkMode : intlIds.lightMode,
            })
          }
        </Typography>
      }
      labelPlacement='start'
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: {
          sm: 'end',
          xs: 'space-between',
        },
        padding: 0,
        margin: 0,
      }}
    />
  )
}

export const ThemeControlCtx = createContext(ThemeControl)
