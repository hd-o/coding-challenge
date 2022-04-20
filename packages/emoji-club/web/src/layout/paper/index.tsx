import { FC } from 'react'
import { Paper } from '@mui/material'

export const LayoutPaper: FC = (props) => {
  return (
    <Paper
      sx={{
        margin: {
          sm: '20px auto',
        },
        maxWidth: {
          sm: '500px',
        },
        minWidth: '360px',
        padding: '12px',
        borderRadius: {
          xs: 0,
          sm: '5px',
        },
      }}
    >
      {props.children}
    </Paper>
  )
}
