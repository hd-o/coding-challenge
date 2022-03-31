import { MuiTooltipCtx } from '/src/pkg/mui/Tooltip'
import { NextLinkCtx } from '/src/pkg/next/Link'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { MyNFTsGridItemCtx } from '../item'
import { MyNFTsGridItemPaperCtx } from '../item/paper'

const MyNFTsGridNFTItem: FC = () => {
  const Link = useContext(NextLinkCtx)
  const MyNFTsGridItem = useContext(MyNFTsGridItemCtx)
  const MyNFTsGridItemPaper = useContext(MyNFTsGridItemPaperCtx)
  const Tooltip = useContext(MuiTooltipCtx)

  const intl = useIntl()

  return (
    <MyNFTsGridItem>
      <Link href='/?NFTId=10' passHref>
        <a>
          <Tooltip
            followCursor
            title={intl.formatMessage({ id: intlIds.myNFTsTooltipOpenDetails })}
          >
            <MyNFTsGridItemPaper>
              <span>🐧</span>
            </MyNFTsGridItemPaper>
          </Tooltip>
        </a>
      </Link>
    </MyNFTsGridItem>
  )
}

export const MyNFTsGridNFTItemCtx = createContext(MyNFTsGridNFTItem)
