import {
  ListItemButton,
  ListItemText,
  List,
  Divider,
  AppBar,
  Typography,
  Box,
  Collapse,
  Toolbar,
  IconButton,
  styled,
  Drawer,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { AppRoutes } from '../../AppRoutes'
import { DropdownMenu, DropdownMenuProps } from '../atoms/DropdownMenu'

import { MenuRoute } from '../types/atomicTypes'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const menuCanvas: DropdownMenuProps = {
  title: 'Core',
  routes: [
    { title: 'Canvas', route: '/canvas' },
    { title: 'Emums', route: '/enums' },
    { title: 'Config', route: '/config' },
    { title: 'Gradients', route: '/gradient' },
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
    { title: 'Envelope', route: '/radialarc/envelope' },
    { title: 'Segment', route: '/radialarc/segment' },
    { title: 'Text', route: '/radialarc/text' },
  ],
}

const menuElementsCentroid: DropdownMenuProps = {
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
  const theme = useTheme()
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: true,
  })
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  })
  const isLgScreen = useMediaQuery(theme.breakpoints.down('lg'), {
    noSsr: true,
  })
  const homeRoute: MenuRoute = { title: 'Home', route: '/' }

  const handleNavigate = useCallback(
    (route: string) => {
      navigate(route)
    },
    [navigate]
  )

  const [expandMenu, setExpandMenu] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(
    !isSmScreen && !isMdScreen
  )
  const handleClick = () => {
    setExpandMenu(!expandMenu)
  }
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }))

  useEffect(() => {
    setOpenDrawer(!isSmScreen && !isMdScreen)
  }, [isSmScreen, isMdScreen, isLgScreen])

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        enableColorOnDark
        className={classes.appBar}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpenDrawer}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              openDrawer && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            D3 Quick starts
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          paddingLeft: { xs: 2, sm: 2, md: 25, lg: 25, xl: 25 },
          paddingTop: { xs: 2, sm: 2 },
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
        variant="persistent"
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleOpenDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
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
            {expandMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={expandMenu} timeout="auto" unmountOnExit>
            <DropdownMenu {...menuElementsOrthogonal} />
            <DropdownMenu {...menuElementsPlotted} />
            <DropdownMenu {...menuElementsRadialArc} />
            <DropdownMenu {...menuElementsCentroid} />
            <DropdownMenu {...menuElementsUnbound} />
          </Collapse>
        </List>
      </Drawer>
    </>
  )
}
