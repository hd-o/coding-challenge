import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiInputCtx } from '/src/pkg/mui/Input'
import { MuiLoadingButtonCtx } from '/src/pkg/mui/LoadingButton'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { SxProps, Theme } from '@mui/material'

const containerSx: SxProps<Theme> = {
  background: theme => theme.app.layoutSectionPaper,
  marginBottom: 1,
  marginTop: 1,
  padding: 1,
  userSelect: 'none',
  width: '100%',
}

const MyNFTsTransfer: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const Input = useContext(MuiInputCtx)
  const LoadingButton = useContext(MuiLoadingButtonCtx)
  const Typography = useContext(MuiTypographyCtx)

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

export const MyNFTsTransferCtx = createContext(MyNFTsTransfer)
