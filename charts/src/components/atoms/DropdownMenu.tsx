import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ListItemButton, ListItemText, Collapse, List } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface MenuRoute {
  displayName: string
  route: string
}

export interface DropdownMenuProps {
  title: string
  routes: MenuRoute[]
}

export const DropdownMenu: FunctionComponent<DropdownMenuProps> = ({
  title,
  routes,
}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  const handleNavigate = (route: string) => {
    navigate(route)
  }
  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ backgroundColor: '#99e6ff' }}>
        <ListItemText primary={title} sx={{ color: 'black' }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {routes.map((route) => (
            <ListItemButton
              key={route.displayName}
              sx={{ pl: 4, pt: 0, pb: 0 }}
              onClick={() => {
                handleNavigate(route.route)
              }}
            >
              <ListItemText primary={route.displayName} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )
}
