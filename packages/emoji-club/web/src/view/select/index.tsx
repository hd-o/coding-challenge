import { SharedSelectCtx } from '/src/shared/select'
import { SharedSelectItemCtx } from '/src/shared/select/item'
import { intlIds } from '/src/util/intl-messages'
import { useRouter } from 'next/router'
import { createContext, FC, useContext } from 'react'
import { useIntl } from 'react-intl'

const ViewSelect: FC = () => {
  const SharedSelect = useContext(SharedSelectCtx)
  const SharedSelectItem = useContext(SharedSelectItemCtx)

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
        <SharedSelectItem key={path.name} value={index} href={path.name}>
          {path.label}
        </SharedSelectItem>
      ))}
      label={intl.formatMessage({ id: intlIds.view })}
      value={selectedIndex}
    />
  )
}

export const ViewSelectCtx = createContext(ViewSelect)
