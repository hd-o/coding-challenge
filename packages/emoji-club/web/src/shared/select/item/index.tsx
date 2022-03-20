import { MuiLinkCtx } from '/src/pkg/mui/Link'
import { MuiMenuItemCtx } from '/src/pkg/mui/MenuItem'
import { NextLinkCtx } from '/src/pkg/next/Link'
import { createContext, FC, useContext } from 'react'
import { MenuItemProps } from '@mui/material'
import { SharedSelectItemBoxCtx } from './box'

interface Props extends MenuItemProps {
  href?: string
  value: Required<MenuItemProps['value']>
}

const SharedSelectItem: FC<Props> = (props) => {
  const { href, ...menuItemProps } = props

  const Link = useContext(MuiLinkCtx)
  const MenuItem = useContext(MuiMenuItemCtx)
  const NextLink = useContext(NextLinkCtx)
  const SharedSelectItemBox = useContext(SharedSelectItemBoxCtx)

  return (
    <MenuItem
      {...menuItemProps}
      sx={{
        ...menuItemProps.sx,
        padding: 0,
      }}
    >
      {
        href === undefined && (
          <SharedSelectItemBox>
            {props.children}
          </SharedSelectItemBox>
        )
      }
      {
        href !== undefined && (
          <NextLink href={href} passHref>
            <Link style={{ width: '100%' }}>
              <SharedSelectItemBox>
                {props.children}
              </SharedSelectItemBox>
            </Link>
          </NextLink>
        )
      }
    </MenuItem>
  )
}

export const SharedSelectItemCtx = createContext(SharedSelectItem)
