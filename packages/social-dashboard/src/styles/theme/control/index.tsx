import { colors } from '/src/styles/colors'
import { intlIds } from '/src/util/intl-messages'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { FormControlLabel, Typography } from '@mui/material'
import { useAppThemeState } from '../state'
import { ThemeSwitch } from '../switch'

export const ThemeControl: FC = () => {
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
