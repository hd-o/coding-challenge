import { useRouter } from 'next/router'
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

  const router = useRouter()
  const NFTId = router.query.NFTId

  return (
    <Grid container spacing={2} sx={containerSx}>
      <MyNFTsGridNFTItem />
      <MyNFTsGridNFTItem />
      <MyNFTsGridNFTItem />
      <MyNFTsGridMinerItem />
      {
        NFTId !== undefined && <MyNFTsDetails />
      }
    </Grid>
  )
}

export const MyNFTsGridCtx = createContext(MyNFTsGrid)
