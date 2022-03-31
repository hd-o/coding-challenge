import { MuiPaperCtx } from '/src/pkg/mui/Paper'
import { createContext, FC, forwardRef, useContext } from 'react'
import { PaperProps, SxProps, Theme } from '@mui/material'

const paperSx: SxProps<Theme> = {
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

const MyNFTsGridItemPaper: FC<PaperProps> = (props, ref) => {
  const Paper = useContext(MuiPaperCtx)

  return (
    <Paper
      {...props}
      ref={ref}
      sx={{ ...paperSx, ...props.sx }}
    >
      {props.children}
    </Paper>
  )
}

export const MyNFTsGridItemPaperCtx = createContext(
  forwardRef(MyNFTsGridItemPaper as any) as FC<PaperProps>,
)
