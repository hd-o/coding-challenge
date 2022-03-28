import { MuiGridCtx } from '/src/pkg/mui/Grid'
import { createContext, FC, useContext } from 'react'

interface BreakpointWidths {
  sm: number
  xs: number
}

interface Props {
  breakpointWidths?: {
    left: BreakpointWidths
    right: BreakpointWidths
  }
  content: {
    left: JSX.Element
    right: JSX.Element
  }
}

const defaultBreakpointWidths: Props['breakpointWidths'] = {
  left: {
    xs: 12,
    sm: 8,
  },
  right: {
    xs: 12,
    sm: 4,
  },
}

const LayoutHeader: FC<Props> = (props) => {
  const Grid = useContext(MuiGridCtx)

  const breakpointWidths = props.breakpointWidths ?? defaultBreakpointWidths

  return (
    <Grid container spacing={0}>
      <Grid item {...breakpointWidths.left}>
        {props.content.left}
      </Grid>
      <Grid item {...breakpointWidths.right}>
        {props.content.right}
      </Grid>
    </Grid>
  )
}

export const LayoutHeaderCtx = createContext(LayoutHeader)
