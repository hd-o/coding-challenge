import { FC } from 'react'
import { Box, SxProps, Theme } from '@mui/material'

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

export const MyNFTsDetailsImage: FC = () => {
  return (
    <Box sx={containerSx}>
      <span>🐧</span>
    </Box>
  )
}
