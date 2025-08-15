import {
  ListItemButton,
  ListItemText,
  List,
  Drawer,
  Divider,
  AppBar,
  Typography,
  Box,
  Collapse,
  Toolbar,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FunctionComponent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { AppRoutes } from '../../AppRoutes'
import { DropdownMenu, DropdownMenuProps } from '../atoms/DropdownMenu'

import { MenuRoute } from '../types/atomicTypes'

const menuCanvas: DropdownMenuProps = {
  title: 'Core',
  routes: [
    { title: 'Canvas', route: '/canvas' },
    { title: 'Emums', route: '/enums' },
    { title: 'Config', route: '/config' },
  ],
}

const menuElementsUnbound: DropdownMenuProps = {
  title: 'Unbound',
  routes: [
    { title: 'Legend', route: '/unbound/legend' },
    { title: 'Text', route: '/unbound/text' },
  ],
}

const menuElementsPlotted: DropdownMenuProps = {
  title: 'Plotted',
  routes: [
    { title: 'Line', route: '/plotted/line' },
    { title: 'Points', route: '/plotted/points' },
    { title: 'Text', route: '/plotted/text' },
  ],
}

const menuElementsRadialArc: DropdownMenuProps = {
  title: 'Arc',
  routes: [
    { title: 'Arc', route: '/radialarc/arc' },
    { title: 'Text', route: '/radialarc/text' },
  ],
}

const menuElementsRadialCentroid: DropdownMenuProps = {
  title: 'Centroid',
  routes: [
    { title: 'Area', route: '/radialcentroid/area' },
    { title: 'Axis', route: '/radialcentroid/axis' },
    { title: 'Points', route: '/radialcentroid/points' },
    { title: 'Line', route: '/radialcentroid/line' },
    { title: 'Spokes', route: '/radialcentroid/spokes' },
    { title: 'Text', route: '/radialcentroid/text' },
  ],
}

const menuElementsOrthogonal: DropdownMenuProps = {
  title: 'Orthogonal',
  routes: [
    { title: 'Area', route: '/orthogonal/area' },
    { title: 'Axis', route: '/orthogonal/axis' },
    { title: 'Bars', route: '/orthogonal/bars' },
    { title: 'Bar Group', route: '/orthogonal/bargroup' },
    { title: 'Bar Stack', route: '/orthogonal/barstack' },
    { title: 'Line', route: '/orthogonal/line' },
    { title: 'Points', route: '/orthogonal/points' },
    { title: 'Text', route: '/orthogonal/text' },
  ],
}

const drawerWidth = '180px'
const appBarHeight = '50px'
const useStyles = makeStyles({
  appBar: {
    height: appBarHeight,
  },
  drawer: {
    marginTop: appBarHeight,
    width: '40px',
    border: 'solid',
    borderColor: 'black',
    borderWidth: '10',
  },
  drawPaper: {
    width: drawerWidth,
  },
})

export const ApplicationLayout: FunctionComponent = () => {
  const navigate = useNavigate()
  const classes = useStyles()
  const homeRoute: MenuRoute = { title: 'Home', route: '/' }

  const handleNavigate = useCallback(
    (route: string) => {
      navigate(route)
    },
    [navigate]
  )

  const [open, setOpen] = useState<boolean>(false)
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        enableColorOnDark
        className={classes.appBar}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            D3 Quick starts
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          paddingLeft: { xs: 25, sm: 30 },
          paddingTop: { xs: 5, sm: 5 },
          bgcolor: 'background.paper',
          marginTop: appBarHeight,
        }}
      >
        <AppRoutes />
      </Box>

      <Drawer
        slotProps={{
          paper: {
            sx: {
              position: 'fixed',
              width: drawerWidth,
              marginTop: appBarHeight,
            },
          },
        }}
        variant="permanent"
      >
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            sx={{
              '& .MuiListItemText-primary': {
                color: 'black',
                fontWeight: 500,
              },
            }}
            onClick={() => {
              handleNavigate(homeRoute.route)
            }}
          >
            <ListItemText>{homeRoute.title}</ListItemText>
          </ListItemButton>

          <Divider />
          <DropdownMenu {...menuCanvas} />
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={'Elements'}
              sx={{
                '& .MuiListItemText-primary': {
                  color: 'black',
                  fontWeight: 500,
                },
              }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <DropdownMenu {...menuElementsOrthogonal} />
            <DropdownMenu {...menuElementsPlotted} />
            <DropdownMenu {...menuElementsRadialArc} />
            <DropdownMenu {...menuElementsRadialCentroid} />
            <DropdownMenu {...menuElementsUnbound} />
          </Collapse>
        </List>
      </Drawer>
    </>
  )
}
