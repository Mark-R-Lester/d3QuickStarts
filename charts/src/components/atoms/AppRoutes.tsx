import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/home/HomePage'
import AxisPage from '../../pages/axis/AxisPage'
import BarsPage from '../../pages/bars/BarsPage'
import AreaPage from '../../pages/area/AreaPage'

export const AppRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      <Route path="/linear/axis" Component={AxisPage} />
      <Route path="/linear/bars" Component={BarsPage} />
      <Route path="/linear/area" Component={AreaPage} />
      <Route path="/linear/line" Component={AreaPage} />
      <Route path="/linear/points" Component={AreaPage} />

      <Route path="/plot/line" Component={AreaPage} />
      <Route path="/plot/scatter" Component={AreaPage} />

      <Route path="/radial/axis" Component={AreaPage} />
      <Route path="/radial/line" Component={AreaPage} />
      <Route path="/radial/area" Component={AreaPage} />
      <Route path="/radial/points" Component={AreaPage} />
      <Route path="/radial/spokes" Component={AreaPage} />
      <Route path="/radial/text" Component={AreaPage} />
    </Routes>
  )
}
