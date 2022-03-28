import { newEmotionCache } from '/src/util/emotion-cache'
import { NextPage } from 'next'
import Document, {
  DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript
} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'

interface Props extends DocumentInitialProps {
  /** @see CustomDocument.getInitialProps */
  emotionStyleTags: JSX.Element[]
}

const CustomDocument: NextPage<Props> = (props) => {
  return (
    <Html lang='en'>
      <Head>
        <link rel='shortcut icon' href='/images/favicon.png' />
        {props.emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// Enable MUI/Emotion server-side rendering of styles
CustomDocument.getInitialProps = async (ctx: DocumentContext): Promise<Props> => {
  const cache = newEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)
  const initialProps = await Document.getInitialProps(ctx)
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App: any) => function EnhanceApp (props) {
      return <App emotionCache={cache} {...props} />
    },
  })

  // https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${String(style.key)} ${String(style.ids.join(' '))}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}

export default CustomDocument
