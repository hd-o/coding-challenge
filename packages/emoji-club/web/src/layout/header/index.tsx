import { ThemeSwitch } from '/src/style/theme/switch'
import { FC } from 'react'
import { Box } from '@mui/material'
import { LayoutTitle } from '../title'

export const LayoutHeader: FC = () => {
  return (
    <Box
      alignItems='center'
      display='flex'
      justifyContent='space-between'
      marginBottom='5px'
    >
      <LayoutTitle />
      <ThemeSwitch />
    </Box>
  )
}
