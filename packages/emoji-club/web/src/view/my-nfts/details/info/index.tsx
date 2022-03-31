import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { createContext, FC, useContext } from 'react'
import { SxProps, Theme } from '@mui/material'
import { MyNFTsTransferCtx } from '../../transfer'

const containerSx: SxProps<Theme> = {
  flexGrow: 1,
  padding: 1,
  paddingLeft: 2,
  paddingRight: 2,
}

const MyNFTsDetailsInfo: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const MyNFTsTransfer = useContext(MyNFTsTransferCtx)
  const Typography = useContext(MuiTypographyCtx)

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

export const MyNFTsDetailsInfoCtx = createContext(MyNFTsDetailsInfo)
