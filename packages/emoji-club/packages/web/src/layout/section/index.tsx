import { FC } from 'react'
import { Box, Paper } from '@mui/material'

export const LayoutSection: FC = (props) => {
  return (
    <Box marginTop={1}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme => theme.app.layoutSectionPaper,
          padding: '10px',
        }}
      >
        {props.children}
      </Paper>
    </Box>
  )
}
