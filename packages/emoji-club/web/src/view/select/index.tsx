import { MuiNativeSelectCtx } from '/src/pkg/mui/NativeSelect'
import { createContext, FC, useContext } from 'react'

const ViewSelect: FC = () => {
  const NativeSelect = useContext(MuiNativeSelectCtx)

  return (
    <NativeSelect
      defaultValue={1}
      fullWidth
      sx={{
        '&::after': {
          display: 'none',
        },
      }}
      inputProps={{
        sx: {
          color: theme => theme.text.primary,
          '& option': {
            color: 'inherit',
          },
          margin: '10px 0',
        },
        name: 'view',
        id: 'native-select',
      }}
    >
      <option value={1}>📔 My NFTs</option>
      <option value={2}>📰 NFT Rankings</option>
    </NativeSelect>
  )
}

export const ViewSelectCtx = createContext(ViewSelect)
