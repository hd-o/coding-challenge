import { intlIds } from '/src/util/intl-messages'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'

export const LayoutTitle: FC = () => {
  const intl = useIntl()
  return (
    <Box>
      <Typography
        color='text.primary'
        variant='h4'
        sx={{
          paddingBottom: '5px',
        }}
      >
        😎 {intl.formatMessage({ id: intlIds.title })}
      </Typography>
    </Box>
  )
}
