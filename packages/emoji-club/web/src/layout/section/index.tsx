import { MuiBoxCtx } from '/src/pkg/mui/Box'
import { MuiPaperCtx } from '/src/pkg/mui/Paper'
import { createContext, FC, useContext } from 'react'

const LayoutSection: FC = (props) => {
  const Box = useContext(MuiBoxCtx)
  const Paper = useContext(MuiPaperCtx)

  return (
    <Box marginTop={1}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme => theme.app.layoutSectionPaper,
          padding: '10px',
        }}
      >
        {props.children}
      </Paper>
    </Box>
  )
}

export const LayoutSectionCtx = createContext(LayoutSection)
