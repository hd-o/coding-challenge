import { MuiContainerCtx } from '/src/pkg/mui/Container'
import { createContext, FC, useContext } from 'react'

const LayoutContainer: FC = (props) => {
  const Container = useContext(MuiContainerCtx)

  return (
    <Container
    sx={{
      maxWidth: theme => theme.maxWidth.layoutContainer,
      paddingTop: '40px',
    }}
  >
    {props.children}
  </Container>
  )
}

export const LayoutContainerCtx = createContext(LayoutContainer)
