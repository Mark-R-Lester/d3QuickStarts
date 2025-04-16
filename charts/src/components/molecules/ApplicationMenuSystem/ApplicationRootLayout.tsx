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
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu } from '../../atoms/DropdownMenu'
import { MenuRoute } from '../../types/atomicTypes'
import { MenuButtonProps } from '../../atoms/MenuButton'
import {
  menuElementsLinear,
  menuElementsPlotted,
  menuElementsRadialArc,
  menuElementsRadialCentroid,
} from './drawerMenuData'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

const drawerWidth = '180px'
const appBarHeight = '90px'
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

export interface RootLayoutData {
  menuData: MenuData[]
}

export interface MenuData {
  appBarTitle: string
  linkAlternatives: LinkAlternatives
}

export interface LinkAlternatives {
  route?: string
  menuButtonProps: MenuButtonProps[]
}

export const ApplicationRootLayout: FunctionComponent = () => {
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
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Typography variant="h6" noWrap component="div">
            D3 Quick starts
          </Typography>
        </Box>
      </AppBar>
      {useMemo(() => {
        return (
          <Drawer
            slotProps={{
              paper: {
                sx: {
                  width: drawerWidth,
                  position: 'fixed',
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
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [
        classes.drawer,
        handleNavigate,
        homeRoute.route,
        homeRoute.title,
        open,
      ])}
    </>
  )
}
