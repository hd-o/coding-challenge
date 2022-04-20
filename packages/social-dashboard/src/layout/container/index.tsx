import { FC } from 'react'
import { Container } from '@mui/material'

export const LayoutContainer: FC = (props) => {
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
