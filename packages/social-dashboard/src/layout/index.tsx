import { FC } from 'react'
import { Box } from '@mui/material'
import { colors } from '../styles/colors'
import { LayoutBackground } from './background'

export const Layout: FC = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: theme => colors[theme.background.layout],
        minHeight: '100vh',
        minWidth: 320,
        paddingBottom: '40px',
        width: '100%',
      }}
    >
      <LayoutBackground />
      <Box
        sx={{
          left: 0,
          position: 'relative',
          top: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}
