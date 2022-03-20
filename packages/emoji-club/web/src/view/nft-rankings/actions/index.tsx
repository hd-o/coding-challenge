import { LayoutSectionCtx } from '/src/layout/section'
import { MuiButtonCtx } from '/src/pkg/mui/Button'
import { createContext, FC, useContext } from 'react'

const NFTRankingsActions: FC = () => {
  const Button = useContext(MuiButtonCtx)
  const LayoutSection = useContext(LayoutSectionCtx)

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

export const NFTRankingsActionsCtx = createContext(NFTRankingsActions)
