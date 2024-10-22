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

  const linearRoutes: MenuRoute[] = [
    { displayName: 'Axis', route: '/axis' },
    { displayName: 'Bars', route: '/bars' },
    { displayName: 'Area', route: '/area' },
    { displayName: 'Line', route: '/line' },
    { displayName: 'Point', route: '/points' },
  ]

  const plotRoutes: MenuRoute[] = [
    { displayName: 'Line', route: '/plot/line' },
    { displayName: 'Scatter', route: '/plot/scatter' },
  ]

  const radialRoutes: MenuRoute[] = [
    { displayName: 'Axis', route: '/radial/axis' },
    { displayName: 'Area', route: '/radial/area' },
    { displayName: 'Line', route: '/radial/line' },
    { displayName: 'Point', route: '/radial/points' },
    { displayName: 'Spokes', route: '/radial/spokes' },
    { displayName: 'Text', route: '/radial/text' },
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
        <DropdownMenu title="Linear" routes={linearRoutes} />
        <Divider />
        <DropdownMenu title="Plot" routes={plotRoutes} />
        <Divider />
        <DropdownMenu title="Radial" routes={radialRoutes} />
      </List>
    </Drawer>
  )
}
