import { FC } from 'react'
import { Grid } from '@mui/material'

export const MyNFTsGridItem: FC = (props) => {
  return (
    <Grid item xs={4} sm={3}>
      {props.children}
    </Grid>
  )
}
