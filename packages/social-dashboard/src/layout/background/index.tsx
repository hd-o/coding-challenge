import { FC } from 'react'
import { Box } from '@mui/material'
import { colors } from '../../styles/colors'

const borderRadius = '16px'

export const LayoutBackground: FC = () => {
  return <Box
    sx={{
      backgroundColor: theme => colors[theme.background.layoutTop],
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      height: '30vh',
      left: 0,
      minHeight: 300,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 0,
    }}
  />
}
