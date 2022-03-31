import { MuiGridCtx } from '/src/pkg/mui/Grid'
import { createContext, FC, useContext } from 'react'

const MyNFTsGridItem: FC = (props) => {
  const Grid = useContext(MuiGridCtx)

  return (
    <Grid item xs={4} sm={3}>
      {props.children}
    </Grid>
  )
}

export const MyNFTsGridItemCtx = createContext(MyNFTsGridItem)
