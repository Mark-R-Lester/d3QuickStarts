import {
  ListItemButton,
  ListItemText,
  List,
  Drawer,
  Divider,
  AppBar,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu } from '../../atoms/DropdownMenu'
import { MenuRoute } from '../../types/atomicTypes'
import { MenuButtonProps } from '../../atoms/MenuButton'
import { rootLayoutData } from './barMenuData'

const drawerWidth = 170
const appBarHeight = 70
const useStyles = makeStyles({
  appBar: {
    height: appBarHeight,
  },
  drawer: {
    width: drawerWidth,
    marginTop: appBarHeight,
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
  const [menuData, setMenuData] = useState<MenuButtonProps[]>([])

  const handleNavigate = useCallback(
    (route: string) => (route: string) => {
      navigate(route)
    },
    [navigate]
  )

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

          {rootLayoutData.menuData.map((datum) => {
            return (
              <Button
                key={datum.appBarTitle}
                variant="text"
                onClick={() =>
                  setMenuData(datum.linkAlternatives.menuButtonProps)
                }
                sx={{ color: 'white', display: 'block' }}
              >
                {datum.appBarTitle}
              </Button>
            )
          })}
        </Box>
      </AppBar>
      {useMemo(() => {
        return (
          <Drawer
            PaperProps={{
              style: {
                position: 'fixed',
                marginTop: appBarHeight,
              },
            }}
            variant="permanent"
            className={classes.drawer}
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
                sx={{ pt: 0 }}
                onClick={() => {
                  handleNavigate(homeRoute.route)
                }}
              >
                <ListItemText>
                  <Typography variant="h6" noWrap component="div">
                    {homeRoute.title}
                  </Typography>
                </ListItemText>
              </ListItemButton>

              {menuData.map((props) => (
                <div key={props.title}>
                  <Divider />
                  <DropdownMenu {...props} />
                </div>
              ))}
            </List>
          </Drawer>
        )
      }, [
        classes.drawer,
        handleNavigate,
        homeRoute.route,
        homeRoute.title,
        menuData,
      ])}
    </>
  )
}
