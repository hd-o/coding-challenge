import { createContext, FC, useContext } from 'react'
import { MuiFormControlCtx } from '../../pkg/mui/FormControl'
import { MuiInputLabelCtx } from '../../pkg/mui/InputLabel'
import { MuiSelectCtx } from '../../pkg/mui/Select'

type SelectItem = JSX.Element | string | number

interface Props {
  items: SelectItem[]
  label: string
  value: number
}

const SharedSelect: FC<Props> = (props) => {
  const FormControl = useContext(MuiFormControlCtx)
  const InputLabel = useContext(MuiInputLabelCtx)
  const Select = useContext(MuiSelectCtx)

  return (
    <FormControl fullWidth>
      <InputLabel
        htmlFor="nft-rankings-ranking-select"
        sx={{
          padding: '20px 10px 0',

        }}
        variant="standard"
      >
        {props.label}
      </InputLabel>
      <Select
        value={props.value}
        fullWidth
        sx={{
          '&::after': {
            display: 'none',
          },
          margin: '5px 0',
        }}
        inputProps={{
          sx: {
            '& option': {
              color: 'inherit',
            },
            margin: '0',
            padding: '30px 10px 10px',
          },
          name: 'view',
          id: 'native-select',
        }}
      >
        {
          props.items
        }
      </Select>
    </FormControl>
  )
}

export const SharedSelectCtx = createContext(SharedSelect)
