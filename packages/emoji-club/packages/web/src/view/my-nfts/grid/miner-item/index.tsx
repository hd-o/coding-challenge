import { intlIds } from '/src/util/intl-messages'
import { useResolve } from '/src/util/use-resolve'
import { useResolve$ } from '/src/util/use-resolve-stream'
import { useWeb3MiningRequest$ } from '/src/web3/mining/request/stream'
import { useWeb3Mining } from '/src/web3/mining/stream'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Box, CircularProgress, Tooltip } from '@mui/material'
import { MyNFTsGridItem } from '../item'
import { MyNFTsGridLoadingButton } from '../loading-button'

export const MyNFTsGridMinerItem: FC = () => {
  const intl = useIntl()
  const mineRequest$ = useResolve(useWeb3MiningRequest$)
  const mining = useResolve$(useWeb3Mining).mining === true

  return (
    <MyNFTsGridItem>
      <Tooltip
        title={intl.formatMessage({
          id: mining
            ? intlIds.myNFTsTooltipMineNFTLoading
            : intlIds.myNFTsTooltipMineNFT,
        })}
      >
        <MyNFTsGridLoadingButton
          disabled={mining}
          onClick={() => mineRequest$.next()}
        >
          <Box color='text.secondary'>
            {
              mining
                ? <CircularProgress />
                : <span>⛏</span>
            }
          </Box>
        </MyNFTsGridLoadingButton>
      </Tooltip>
    </MyNFTsGridItem>
  )
}
