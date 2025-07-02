import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ListItemButton, ListItemText, Collapse, List } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuRoute } from '../types/atomicTypes'

export interface DropdownMenuProps {
  title: string
  routes: MenuRoute[]
}

export const DropdownMenu: FunctionComponent<DropdownMenuProps> = ({
  title,
  routes,
}) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const handleClick = () => {
    setOpen(!open)
  }

  const handleNavigate = (route: string) => {
    navigate(route)
  }
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary={title}
          sx={{
            '& .MuiListItemText-primary': {
              marginLeft: '5%',
              color: 'grey',
              fontWeight: 400,
            },
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {routes.map((route) => (
            <ListItemButton
              key={route.title}
              sx={{
                '& .MuiListItemText-primary': {
                  marginLeft: '10%',
                  color: 'steelBlue',
                  fontWeight: 400,
                },
              }}
              onClick={() => {
                handleNavigate(route.route)
              }}
            >
              <ListItemText primary={route.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  )
}
