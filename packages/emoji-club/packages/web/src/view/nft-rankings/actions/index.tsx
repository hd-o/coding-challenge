import { LayoutSection } from '/src/layout/section'
import { FC } from 'react'
import { Button } from '@mui/material'

export const NFTRankingsActions: FC = () => {
  return (
    <LayoutSection>
      <Button
        disableRipple
        color='secondary'
        href='https://etherscan.io/tokens-nft1155'
        target='_blank'
        variant='contained'
      >
        👀 See more at Etherscan
      </Button>
    </LayoutSection>
  )
}
