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
import { DropdownMenu } from '../../atoms/DropdownMenu'
import { MenuRoute } from '../../types/atomicTypes'
import {
  menuCanvas,
  menuElementsLinear,
  menuElementsPlotted,
  menuElementsRadialArc,
  menuElementsRadialCentroid,
} from './drawerMenuData'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { AppRoutes } from '../../../AppRoutes'

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
            <DropdownMenu {...menuElementsLinear} />
            <DropdownMenu {...menuElementsPlotted} />
            <DropdownMenu {...menuElementsRadialArc} />
            <DropdownMenu {...menuElementsRadialCentroid} />
          </Collapse>
        </List>
      </Drawer>
    </>
  )
}
