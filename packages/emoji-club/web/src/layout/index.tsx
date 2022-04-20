import { LayoutBackground } from '/src/layout/background'
import { LayoutHeader } from '/src/layout/header'
import { LayoutPaper } from '/src/layout/paper'
import { ViewSelect } from '/src/view/select'
import { FC } from 'react'

export const Layout: FC = (props) => {
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
