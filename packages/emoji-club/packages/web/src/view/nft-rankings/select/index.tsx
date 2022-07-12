import { SharedSelect } from '/src/shared/select'
import { SharedSelectItem } from '/src/shared/select/item'
import { EtherscanIcon, EtherscanIconLight } from '/src/style/icons/etherscan'
import { OpenSeaIcon } from '/src/style/icons/opensea'
import { intlIds } from '/src/util/intl-messages'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Box, Typography, useTheme } from '@mui/material'

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

export const NFTRankingsSelect: FC = () => {
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
