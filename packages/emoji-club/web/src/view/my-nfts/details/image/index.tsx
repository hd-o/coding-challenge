import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { createContext, FC, useContext } from 'react'
import { SxProps, Theme } from '@mui/material'

const containerSx: SxProps<Theme> = {
  alignItems: 'center',
  background: theme => theme.app.layoutSectionPaper,
  display: 'flex',
  flexGrow: 1,
  fontSize: 50,
  justifyContent: 'center',
  maxWidth: '100px',
  minWidth: '100px',
  userSelect: 'none',
}

const MyNFTsDetailsImage: FC = () => {
  const Box = useContext(MuiBoxCtx)

  return (
    <Box sx={containerSx}>
      <span>🐧</span>
    </Box>
  )
}

export const MyNFTsDetailsImageCtx = createContext(MyNFTsDetailsImage)
