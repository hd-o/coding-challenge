import { useRouter } from 'next/router'
import { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton, SxProps, Theme } from '@mui/material'

const iconButtonSx: SxProps<Theme> = {
  padding: 0,
  position: 'absolute',
  right: 2,
  top: 2,
  zIndex: 1,
}

export const MyNFTsDetailsCloseButton: FC = () => {
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
