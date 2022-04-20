import { FC } from 'react'
import { Divider } from '@mui/material'

export const LayoutDivider: FC = () => {
  return <Divider
    sx={{
      // background: theme => theme.background.divider,
      marginBottom: '5px',
    }}
  />
}
