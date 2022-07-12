import { FC } from 'react'
import { Box } from '@mui/material'

export const LayoutBackground: FC = (props) => {
  return (
    <Box
      color='text.primary'
      sx={{
        backgroundColor: theme => theme.palette.background.default,
        height: '100vh',
        left: 0,
        overflow: 'auto',
        position: 'fixed',
        top: 0,
        width: '100vw',
      }}
    >
      {props.children}
    </Box>
  )
}
