import { SharedSelectCtx } from '/src/shared/select'
import { EtherscanIconCtx, EtherscanIconLightCtx } from '/src/style/icons/etherscan'
import { OpenSeaIconCtx } from '/src/style/icons/opensea'
import { intlIds } from '/src/util/intl-messages'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { useTheme } from '@mui/material'
import { MuiBoxCtx } from '../../../pkg/mui/Box'
import { MuiMenuItemCtx } from '../../../pkg/mui/MenuItem'
import { MuiTypographyCtx } from '../../../pkg/mui/Typography'

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
  const MenuItem = useContext(MuiMenuItemCtx)
  const OpenSeaIcon = useContext(OpenSeaIconCtx)
  const SharedSelect = useContext(SharedSelectCtx)
  const Typography = useContext(MuiTypographyCtx)

  const intl = useIntl()
  const theme = useTheme()

  const sourceIcons: Record<Ranking['source'], JSX.Element> = {
    etherscan: theme.name === 'dark'
      ? <EtherscanIconLight {...iconImageProps} />
      : <EtherscanIcon {...iconImageProps} />,
    opensea: <OpenSeaIcon {...iconImageProps} />,
  }

  const items = rankings.map((ranking, index) => (
    <MenuItem
      key={index}
      value={index}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'middle',
        }}
      >
        {sourceIcons[ranking.source]}
        <Typography
          variant='body1'
          sx={{
            marginLeft: '5px',
          }}
        >
          {ranking.title}
        </Typography>
      </Box>
    </MenuItem>
  ))

  return (
    <SharedSelect
      items={items}
      label={intl.formatMessage({ id: intlIds.ranking })}
      value={0}
    />
  )
}

export const NFTRankingsSelectCtx = createContext(NFTRankingsSelect)
