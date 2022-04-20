import NextLink from 'next/link'
import { FC } from 'react'
import { Link, MenuItem, MenuItemProps } from '@mui/material'
import { SharedSelectItemBox } from './box'

interface Props extends MenuItemProps {
  href?: string
  value: Required<MenuItemProps['value']>
}

export const SharedSelectItem: FC<Props> = (props) => {
  const { href, ...menuItemProps } = props
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
