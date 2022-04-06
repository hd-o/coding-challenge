import { MuiTooltipCtx } from '/src/pkg/mui/Tooltip'
import { NextLinkCtx } from '/src/pkg/next/Link'
import { intlIds } from '/src/util/intl-messages'
import { Web3Token } from '/src/web3/tokens'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { MyNFTsGridItemCtx } from '../item'
import { MyNFTsGridItemPaperCtx } from '../item/paper'

interface Props {
  token: Web3Token
}

const MyNFTsGridNFTItem: FC<Props> = () => {
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
