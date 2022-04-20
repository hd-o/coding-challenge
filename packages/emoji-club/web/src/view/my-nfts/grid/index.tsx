import { useResolve$ } from '/src/util/use-resolve-stream'
import { useWeb3Tokens } from '/src/web3/tokens'
import { FC } from 'react'
import { Grid, SxProps, Theme } from '@mui/material'
import { MyNFTsDetails } from '../details'
import { MyNFTsGridMinerItem } from './miner-item'
import { MyNFTsGridNFTItem } from './nft-item'

const containerSx: SxProps<Theme> = {
  marginTop: 0,
}

export const MyNFTsGrid: FC = () => {
  const { tokens = [] } = useResolve$(useWeb3Tokens)

  return (
    <Grid container spacing={2} sx={containerSx}>
      {
        tokens.map(token =>
          <MyNFTsGridNFTItem
            key={token.toString()}
            token={token}
          />
        )
      }
      <MyNFTsGridMinerItem />
      <MyNFTsDetails />
    </Grid>
  )
}
