import { FC } from 'react'
import { Theme } from '@mui/material/styles'
import { colors } from '../colors'

interface Props {
  theme: Theme
}

export const GlobalStyles: FC<Props> = (props) => {
  const { theme } = props
  return <style>
    {`
      body {
        background: ${colors[theme.background.layout]}; 
      }
    `}
  </style>
}
