import { useResolve$ } from '/src/util/use-resolve-stream'
import { useWeb3Tokens } from '/src/web3/tokens'
import { createContext, FC, useContext } from 'react'
import { Grid, SxProps, Theme } from '@mui/material'
import { MyNFTsDetailsCtx } from '../details'
import { MyNFTsGridMinerItemCtx } from './miner-item'
import { MyNFTsGridNFTItemCtx } from './nft-item'

const containerSx: SxProps<Theme> = {
  marginTop: 0,
}

const MyNFTsGrid: FC = () => {
  const MyNFTsDetails = useContext(MyNFTsDetailsCtx)
  const MyNFTsGridNFTItem = useContext(MyNFTsGridNFTItemCtx)
  const MyNFTsGridMinerItem = useContext(MyNFTsGridMinerItemCtx)
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

export const MyNFTsGridCtx = createContext(MyNFTsGrid)
