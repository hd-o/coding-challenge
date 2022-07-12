import { FC } from 'react'
import { FormControl, InputLabel, Select } from '@mui/material'

type SelectItem = JSX.Element | string | number

interface Props {
  items: SelectItem[]
  label: string
  value: number
}

export const SharedSelect: FC<Props> = (props) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        htmlFor="nft-rankings-ranking-select"
        sx={{
          padding: '12px 0 0 10px',
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
        }}
        inputProps={{
          sx: {
            '& option': {
              color: 'inherit',
            },
            display: 'flex',
            margin: '0',
            padding: '30px 0 10px 10px',
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
