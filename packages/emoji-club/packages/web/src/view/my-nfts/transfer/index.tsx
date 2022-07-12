import { intlIds } from '/src/util/intl-messages'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { LoadingButton } from '@mui/lab'
import { Box, Input, SxProps, Theme, Typography } from '@mui/material'

const containerSx: SxProps<Theme> = {
  background: theme => theme.app.layoutSectionPaper,
  marginBottom: 1,
  marginTop: 1,
  padding: 1,
  userSelect: 'none',
  width: '100%',
}

export const MyNFTsTransfer: FC = () => {
  const intl = useIntl()

  return (
    <Box sx={containerSx}>
      <Typography variant='body1'>
        {intl.formatMessage({ id: intlIds.transferNFT })}
      </Typography>
      <Input
        type='text'
        placeholder={intl.formatMessage({ id: intlIds.destinationAddress })}
        sx={{ marginRight: 1 }}
      />
      <LoadingButton disabled={true}>
        {intl.formatMessage({ id: intlIds.send })}
      </LoadingButton>
    </Box>
  )
}
