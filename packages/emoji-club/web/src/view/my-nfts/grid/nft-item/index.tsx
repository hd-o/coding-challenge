import { intlIds } from '/src/util/intl-messages'
import { Web3Token } from '/src/web3/tokens'
import Link from 'next/link'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Tooltip } from '@mui/material'
import { MyNFTsGridItem } from '../item'
import { MyNFTsGridLoadingButton } from '../loading-button'

interface Props {
  token: Web3Token
}

export const MyNFTsGridNFTItem: FC<Props> = () => {
  const intl = useIntl()

  return (
    <MyNFTsGridItem>
      <Link href='/?NFTId=10' passHref>
        <a>
          <Tooltip
            title={intl.formatMessage({ id: intlIds.myNFTsTooltipOpenDetails })}
          >
            <MyNFTsGridLoadingButton>
              <span>🐧</span>
            </MyNFTsGridLoadingButton>
          </Tooltip>
        </a>
      </Link>
    </MyNFTsGridItem>
  )
}
