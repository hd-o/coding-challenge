import type { NextPage } from 'next'
import { LayoutCtx } from '/src/layout'
import { LayoutContainerCtx } from '/src/layout/container'
import { LayoutHeaderCtx } from '/src/layout/header'
import { SocialHeaderCtx } from '/src/social/header'
import { SocialOverviewCtx } from '/src/social/overview'
import { GlobalStylesCtx } from '/src/styles/global'
import { ThemeControlCtx } from '/src/styles/theme/control'
import { intlIds } from '/src/util/intl-messages'
import Head from 'next/head'
import { useContext } from 'react'
import { useIntl } from 'react-intl'
import { useTheme } from '@mui/material'
import { SocialGridCtx } from '../src/social/grid'

const Index: NextPage = () => {
  const GlobalStyles = useContext(GlobalStylesCtx)
  const Layout = useContext(LayoutCtx)
  const LayoutContainer = useContext(LayoutContainerCtx)
  const LayoutHeader = useContext(LayoutHeaderCtx)
  const SocialCardGrid = useContext(SocialGridCtx)
  const SocialHeader = useContext(SocialHeaderCtx)
  const SocialOverview = useContext(SocialOverviewCtx)
  const ThemeToggle = useContext(ThemeControlCtx)

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
              right: <ThemeToggle />,
            }}
          />
          <SocialCardGrid />
          <SocialOverview />
        </LayoutContainer>
      </Layout>
    </div>
  )
}

export default Index
