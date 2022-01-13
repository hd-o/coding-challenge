import '../public/global.css'
import 'reflect-metadata'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
