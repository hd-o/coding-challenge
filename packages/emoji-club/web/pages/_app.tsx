import '/src/style/index.css'
import { themes } from '/src/style/theme'
import { AppProps } from 'next/app'
import { FC } from 'react'
import { ThemeProvider } from '@mui/material'

const MyApp: FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  const theme = themes.dark

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
