import React from 'react'
import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom"
import BarsPage from './pages/bars/BarsPage'
import HomePage from "./pages/home/HomePage"
import AxisPage from "./pages/axis/AxisPage"
import { Box, Tab, Tabs } from '@mui/material'

export default function App() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()

  const handleNavigate = (event: React.SyntheticEvent, val: number) => {
    const routes: string[] = ['/','/axis','/bars']
    setValue(val);
    navigate(routes[val]);
  }
  return (
    <>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleNavigate}
          aria-label="nav tabs example"
          role="navigation"
        >
          <Tab label="Home"/>
          <Tab label="Axis"/>
          <Tab label="Bars"/>
        </Tabs>
      </Box>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/axis" Component={AxisPage} />
        <Route path="/bars" Component={BarsPage} />
      </Routes>
      
    </>
  )
}

