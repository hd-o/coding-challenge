import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { createContext, useContext } from 'react'
import { BoxProps } from '@mui/system'

function ContainerBox (props: BoxProps): JSX.Element {
  const Box = useContext(MuiBoxCtx)
  return <Box
    {...props}
    sx={{
      margin: '0 auto',
      minWidth: 600,
      padding: '20px 30px 0 30px',
      ...props.sx,
    }}
  />
}

export const ContainerBoxCtx = createContext(ContainerBox)
