import Document, { Head, Html, Main, NextScript } from 'next/document'
import { getStyles } from 'typestyle'

export default class MyDocument extends Document {
  render (): JSX.Element {
    return (
      <Html>
        <Head>
          <style id='styles-target'>
            {getStyles()}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
