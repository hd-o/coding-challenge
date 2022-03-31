import { MuiCloseIconCtx } from '/src/pkg/mui/CloseButton'
import { MuiIconButtonCtx } from '/src/pkg/mui/MuiIconButton'
import { useRouter } from 'next/router'
import { createContext, FC, useContext } from 'react'
import { SxProps, Theme } from '@mui/material'

const iconButtonSx: SxProps<Theme> = {
  padding: 0,
  position: 'absolute',
  right: 2,
  top: 2,
  zIndex: 1,
}

const MyNFTsDetailsCloseButton: FC = () => {
  const CloseIcon = useContext(MuiCloseIconCtx)
  const IconButton = useContext(MuiIconButtonCtx)

  const router = useRouter()

  return (
    <IconButton
      aria-label='close'
      onClick={router.back}
      sx={iconButtonSx}
    >
      <CloseIcon />
    </IconButton>
  )
}

export const MyNFTsDetailsCloseButtonCtx = createContext(MyNFTsDetailsCloseButton)
