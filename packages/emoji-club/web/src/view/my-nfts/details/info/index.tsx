import { FC } from 'react'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { MyNFTsTransfer } from '../../transfer'

const containerSx: SxProps<Theme> = {
  flexGrow: 1,
  padding: 1,
  paddingLeft: 2,
  paddingRight: 2,
}

export const MyNFTsDetailsInfo: FC = () => {
  return (
    <Box sx={containerSx}>
      <Typography variant='h5'>
        penguin
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Unicode 1F427
      </Typography>
      <MyNFTsTransfer />
    </Box>
  )
}
