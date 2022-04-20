import { FC } from 'react'
import { Typography } from '@mui/material'

export const LayoutSectionHeader: FC = (props) => {
  return (
    <Typography variant='body1'>
      {props.children}
    </Typography>
  )
}
