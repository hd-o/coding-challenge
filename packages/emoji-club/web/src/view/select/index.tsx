import { MuiMenuItemCtx } from '/src/pkg/mui/MenuItem'
import { SharedSelectCtx } from '/src/shared/select'
import { intlIds } from '/src/util/intl-messages'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'

const ViewSelect: FC = () => {
  const MenuItem = useContext(MuiMenuItemCtx)
  const SharedSelect = useContext(SharedSelectCtx)

  const intl = useIntl()
  const router = useRouter()

  const paths = [
    {
      name: '/',
      label: intl.formatMessage({ id: intlIds.viewMyNFTs }),
    },
    {
      name: '/nft-rankings',
      label: intl.formatMessage({ id: intlIds.viewNFTRankings }),
    },
  ]

  const selectedPath = paths.find(path => path.name === router.pathname)
  const selectedIndex = selectedPath !== undefined ? paths.indexOf(selectedPath) : 0

  return (
    <SharedSelect
      items={paths.map((path, index) => (
        <MenuItem
          key={path.name}
          value={index}
        >
          <Link href={path.name} passHref>
            <Box sx={{ width: '100%' }}>
              {path.label}
            </Box>
          </Link>
        </MenuItem>
      ))}
      label={intl.formatMessage({ id: intlIds.view })}
      value={selectedIndex}
    />
  )
}

export const ViewSelectCtx = createContext(ViewSelect)
