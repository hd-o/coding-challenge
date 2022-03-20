import { LayoutBackgroundCtx } from '/src/layout/background'
import { LayoutHeaderCtx } from '/src/layout/header'
import { LayoutPaperCtx } from '/src/layout/paper'
import { ViewSelectCtx } from '/src/view/select'
import { createContext, FC, useContext } from 'react'

const Layout: FC = (props) => {
  const LayoutBackground = useContext(LayoutBackgroundCtx)
  const LayoutHeader = useContext(LayoutHeaderCtx)
  const LayoutPaper = useContext(LayoutPaperCtx)
  const ViewSelect = useContext(ViewSelectCtx)

  return (
    <LayoutBackground>
      <LayoutPaper>
        <LayoutHeader />
        <ViewSelect />
        {props.children}
      </LayoutPaper>
    </LayoutBackground>
  )
}

export const LayoutCtx = createContext(Layout)
