import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiTooltipCtx } from '/src/pkg/mui/Tooltip'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { CircularProgress, SxProps, Theme } from '@mui/material'
import { MyNFTsGridItemCtx } from '../item'
import { MyNFTsGridItemPaperCtx } from '../item/paper'

const paperSx: SxProps<Theme> = {
  opacity: 0.5,
  '&:hover': {
    opacity: 1,
  },
}

const MyNFTsGridMinerItem: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const MyNFTsGridItem = useContext(MyNFTsGridItemCtx)
  const MyNFTsGridItemPaper = useContext(MyNFTsGridItemPaperCtx)
  const Tooltip = useContext(MuiTooltipCtx)

  const intl = useIntl()
  const mining = false

  return (
    <MyNFTsGridItem>
      <Tooltip
        followCursor
        title={intl.formatMessage({
          id: mining
            ? intlIds.myNFTsTooltipMineNFTLoading
            : intlIds.myNFTsTooltipMineNFT,
        })}
      >
        <MyNFTsGridItemPaper sx={mining ? {} : paperSx}>
          <Box>
            {
              mining
                ? <CircularProgress />
                : <span>⛏</span>
            }
          </Box>
        </MyNFTsGridItemPaper>
      </Tooltip>
    </MyNFTsGridItem>
  )
}

export const MyNFTsGridMinerItemCtx = createContext(MyNFTsGridMinerItem)
