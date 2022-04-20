import { createContext, FC, forwardRef, useContext } from 'react'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { SxProps, Theme } from '@mui/material'

const buttonSx: SxProps<Theme> = {
  alignItems: 'center',
  background: theme => theme.app.layoutSectionPaper,
  cursor: 'pointer',
  display: 'flex',
  fontSize: 50,
  justifyContent: 'center',
  height: '100px',
  userSelect: 'none',
  minWidth: '100px',
  width: '100%',
  '&:hover': {
    background: theme => theme.app.layoutSectionPaperHover,
  },
}

const MyNFTsGridLoadingButtonBase: FC<LoadingButtonProps> = (props, ref) => {
  return (
    <LoadingButton
      {...props}
      ref={ref}
      sx={{ ...buttonSx, ...props.sx }}
    >
      {props.children}
    </LoadingButton>
  )
}

export const MyNFTsGridLoadingButton =
  forwardRef(MyNFTsGridLoadingButtonBase as any) as FC<PaperProps>
