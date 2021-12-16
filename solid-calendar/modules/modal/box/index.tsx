import { createContext, useContext } from 'react'
import { MuiBoxCtx } from '~/pkg/mui/Box'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { BoxProps, useTheme } from '@mui/system'

interface Props extends BoxProps {
  onClose?: () => void
  withCloseButton?: true
}

function ModalBox (props: Props): JSX.Element {
  const Box = useContext(MuiBoxCtx)
  const theme = useTheme()
  return <Box
    {...props}
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      minWidth: 400,
      minHeight: 200,
      width: '90vw',
      maxWidth: 550,
      overflow: 'auto',
      backgroundColor: '#fff',
      border: '2px solid #444',
      padding: theme.spacing(2),
      ...props.sx
    }}
  >
    {props.withCloseButton === true &&
      <IconButton
        onClick={props.onClose}
        aria-label="Close"
        sx={{
          position: 'absolute',
          right: 20,
          top: 15,
          zIndex: 1
        }}
        title='Close'
      >
        <CloseIcon />
      </IconButton>
    }
    {props.children}
  </Box>
}

export const ModalBoxCtx = createContext(ModalBox)
