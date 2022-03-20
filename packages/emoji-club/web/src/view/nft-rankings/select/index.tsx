import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiTypographyCtx } from '/src/pkg/mui/Typography'
import { SharedSelectCtx } from '/src/shared/select'
import { SharedSelectItemCtx } from '/src/shared/select/item'
import { EtherscanIconCtx, EtherscanIconLightCtx } from '/src/style/icons/etherscan'
import { OpenSeaIconCtx } from '/src/style/icons/opensea'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useTheme } from '@mui/material'

interface Ranking {
  source: 'etherscan' | 'opensea'
  title: string
}

const rankings: Ranking[] = [
  {
    source: 'etherscan',
    title: 'Etherscan Top ERC-1155',
  },
  {
    source: 'etherscan',
    title: 'Etherscan Top ERC-721',
  },
  {
    source: 'opensea',
    title: 'OpenSea Top NFTs',
  },
]

const iconImageProps = {
  height: 20,
  width: 20,
}

const NFTRankingsSelect: FC = () => {
  const Box = useContext(MuiBoxCtx)
  const EtherscanIcon = useContext(EtherscanIconCtx)
  const EtherscanIconLight = useContext(EtherscanIconLightCtx)
  const OpenSeaIcon = useContext(OpenSeaIconCtx)
  const SharedSelect = useContext(SharedSelectCtx)
  const SharedSelectItem = useContext(SharedSelectItemCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useIntl()
  const theme = useTheme()

  const sourceIcons: Record<Ranking['source'], JSX.Element> = {
    etherscan: theme.palette.mode === 'dark'
      ? <EtherscanIconLight {...iconImageProps} />
      : <EtherscanIcon {...iconImageProps} />,
    opensea: <OpenSeaIcon {...iconImageProps} />,
  }

  const items = rankings.map((ranking, index) => (
    <SharedSelectItem key={index} value={index}>
      {sourceIcons[ranking.source]}
      <Typography variant='body1' marginLeft='5px'>
        {ranking.title}
      </Typography>
    </SharedSelectItem>
  ))

  return (
    <>
      <Box marginTop={1} />
      <SharedSelect
        items={items}
        label={intl.formatMessage({ id: intlIds.ranking })}
        value={0}
      />
    </>
  )
}

export const NFTRankingsSelectCtx = createContext(NFTRankingsSelect)
