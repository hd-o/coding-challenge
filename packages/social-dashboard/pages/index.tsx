import type { NextPage } from 'next'
import { Layout } from '/src/layout'
import { LayoutContainer } from '/src/layout/container'
import { LayoutHeader } from '/src/layout/header'
import { SocialGrid } from '/src/social/grid'
import { SocialHeader } from '/src/social/header'
import { SocialOverview } from '/src/social/overview'
import { GlobalStyles } from '/src/styles/global'
import { ThemeControl } from '/src/styles/theme/control'
import { intlIds } from '/src/util/intl-messages'
import Head from 'next/head'
import { useIntl } from 'react-intl'
import { useTheme } from '@mui/material'

const Index: NextPage = () => {
  const intl = useIntl()
  const pageTitle = intl.formatMessage({ id: intlIds.socialDashboardTitle })

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content={pageTitle} />
        <GlobalStyles theme={useTheme()} />
      </Head>
      <Layout>
        <LayoutContainer>
          <LayoutHeader
            content={{
              left: <SocialHeader />,
              right: <ThemeControl />,
            }}
          />
          <SocialGrid />
          <SocialOverview />
        </LayoutContainer>
      </Layout>
    </div>
  )
}

export default Index
