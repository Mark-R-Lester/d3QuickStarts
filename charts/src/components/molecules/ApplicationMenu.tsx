import {
  ListItemButton,
  ListItemText,
  List,
  Drawer,
  Divider,
  ListSubheader,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, MenuRoute } from '../atoms/DropdownMenu'

const drawerWidth = 170
const useStyles = makeStyles({
  page: {
    background: '#f9f9f9',
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
  },
  drawPaper: {
    width: drawerWidth,
  },
})

export const ApplicationMenu: FunctionComponent = () => {
  const navigate = useNavigate()
  const classes = useStyles()

  const homeRoute: MenuRoute = { displayName: 'Home', route: '/' }

  const elementRoutes: MenuRoute[] = [
    { displayName: 'Linear', route: '/linear/elements' },
    { displayName: 'Plotted', route: '/plotted/elements' },
    { displayName: 'Radial', route: '/radial/elements' },
  ]

  const transitionRoutes: MenuRoute[] = []

  const chartRoutes: MenuRoute[] = [
    { displayName: 'Linear', route: '/linear/charts' },
    { displayName: 'Plotted', route: '/plotted/charts' },
    { displayName: 'Radial', route: '/radial/charts' },
  ]

  const handleNavigate = (route: string) => {
    navigate(route)
  }
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawPaper }}
    >
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Menu
          </ListSubheader>
        }
      >
        <ListItemButton
          sx={{ pt: 0 }}
          onClick={() => {
            handleNavigate(homeRoute.route)
          }}
        >
          <ListItemText primary={homeRoute.displayName} />
        </ListItemButton>

        <Divider />
        <DropdownMenu title="Elements" routes={elementRoutes} />
        <Divider />
        <DropdownMenu title="Transitions" routes={transitionRoutes} />
        <Divider />
        <DropdownMenu title="Charts" routes={chartRoutes} />
      </List>
    </Drawer>
  )
}
