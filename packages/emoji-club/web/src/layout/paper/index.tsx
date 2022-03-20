import { MuiPaperCtx } from '/src/pkg/mui/Paper'
import { createContext, FC, useContext } from 'react'

const LayoutPaper: FC = (props) => {
  const Paper = useContext(MuiPaperCtx)
  return (
    <Paper
      sx={{
        margin: {
          sm: '20px auto',
        },
        maxWidth: {
          sm: '500px',
        },
        minWidth: '360px',
        padding: '12px',
        borderRadius: {
          xs: 0,
          sm: '5px',
        },
      }}
    >
      {props.children}
    </Paper>
  )
}

export const LayoutPaperCtx = createContext(LayoutPaper)
