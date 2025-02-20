import { Button, Link, Menu, MenuItem } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuRoute } from '../types/atomicTypes'

export interface MenuButtonProps {
  title: string
  routes: MenuRoute[]
}

export const MenuButton: FunctionComponent<MenuButtonProps> = ({
  title,
  routes,
}) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleNavigate = (route: string) => {
    setAnchorEl(null)
    navigate(route)
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{ color: 'white', display: 'block' }}
      >
        {title}
      </Button>

      <Link
        variant="h6"
        noWrap
        // href={'/linear/charts'}
        sx={{ color: 'white', padding: 5 }}
      >
        {title}
      </Link>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClick}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {routes.map((route) => (
          <MenuItem onClick={() => handleNavigate(route.route)}>
            {route.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
