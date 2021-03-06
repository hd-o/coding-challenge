import { useEthersBigNumber } from '/src/pkg/ethers/BigNumber'
import { useResolve } from '/src/util/use-resolve'
import { useResolve$ } from '/src/util/use-resolve-stream'
import { useWeb3Tokens } from '/src/web3/tokens'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Box, Modal, SxProps, Theme } from '@mui/material'
import { MyNFTsDetailsCloseButton } from './close-button'
import { MyNFTsDetailsImage } from './image'
import { MyNFTsDetailsInfo } from './info'

const containerSx: SxProps<Theme> = {
  backgroundColor: 'background.paper',
  borderRadius: '3px',
  boxShadow: 24,
  display: 'flex',
  left: '50%',
  minWidth: '300px',
  padding: 0,
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
}

export const MyNFTsDetails: FC = () => {
  const BigNumber = useResolve(useEthersBigNumber)
  const router = useRouter()
  const NFTIdQuery = BigNumber.from(router.query.NFTId ?? '-0')
  const { tokens = [] } = useResolve$(useWeb3Tokens)
  const currentUserOwnsNFT = tokens.includes(NFTIdQuery)

  if (!currentUserOwnsNFT) return null

  return (
    <Modal
      open={true}
      onClose={router.back}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={containerSx}>
        <MyNFTsDetailsCloseButton />
        <MyNFTsDetailsImage />
        <MyNFTsDetailsInfo />
      </Box>
    </Modal>
  )
}
