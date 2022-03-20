import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { createContext, FC, useContext } from 'react'

const LayoutSectionHeader: FC = (props) => {
  const Typography = useContext(MuiTypographyCtx)

  return (
    <Typography variant='body1'>
      {props.children}
    </Typography>
  )
}

export const LayoutSectionHeaderCtx = createContext(LayoutSectionHeader)
