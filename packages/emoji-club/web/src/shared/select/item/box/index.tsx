import { FC } from 'react'
import { Box } from '@mui/material'

export const SharedSelectItemBox: FC = (props) => {
  return <Box
    {...props}
    sx={{
      width: '100%',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'middle',
    }}
  />
}
