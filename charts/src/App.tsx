import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import BarsPage from './pages/bars/BarsPage'
import HomePage from './pages/home/HomePage'
import AxisPage from './pages/axis/AxisPage'
import {
  Box,
  Container,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { PageContainer } from '@toolpad/core'
import { makeStyles } from '@mui/styles'
import AreaPage from './pages/area/AreaPage'
import { DropdownMenu, MenuRoute } from './components/atoms/DropdownMenu'

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
  root: {
    display: 'flex',
  },
})

export default function App() {
  const navigate = useNavigate()
  const classes = useStyles()

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

  const homeRoute: MenuRoute = { displayName: 'Home', route: '/' }

  const handleNavigate = (route: string) => {
    navigate(route)
  }
  return (
    <>
      <Container maxWidth="xl" className={classes.root}>
        <Box
          sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}
        >
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
        </Box>
        <PageContainer sx={{ bgcolor: '' }}>
          <Routes>
            <Route path="/" Component={HomePage} />

            <Route path="/axis" Component={AxisPage} />
            <Route path="/bars" Component={BarsPage} />
            <Route path="/area" Component={AreaPage} />
            <Route path="/line" Component={AreaPage} />
            <Route path="/points" Component={AreaPage} />

            <Route path="/plot/line" Component={AreaPage} />
            <Route path="/plot/scatter" Component={AreaPage} />

            <Route path="/radial/axis" Component={AreaPage} />
            <Route path="/radial/line" Component={AreaPage} />
            <Route path="/radial/area" Component={AreaPage} />
            <Route path="/radial/points" Component={AreaPage} />
            <Route path="/radial/spokes" Component={AreaPage} />
            <Route path="/radial/text" Component={AreaPage} />
          </Routes>
        </PageContainer>
      </Container>
    </>
  )
}
