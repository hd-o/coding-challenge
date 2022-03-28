import { createContext, FC, useContext } from 'react'
import { Theme } from '@mui/material/styles'
import { ColorsCtx } from '../colors'

interface Props {
  theme: Theme
}

const GlobalStyles: FC<Props> = (props) => {
  const { theme } = props
  const colors = useContext(ColorsCtx)

  return <style>
    {`
      body {
        background: ${colors[theme.background.layout]}; 
      }
    `}
  </style>
}

export const GlobalStylesCtx = createContext(GlobalStyles)
