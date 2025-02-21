import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import PlottedElementsPage from './pages/plotted/PlottedElementsPage'
import RadialElementsPage from './pages/radial/RadialElementsPage'
import PlottedTransitionsPage from './pages/plotted/PlottedTransitionsPage'
import LinearTransitionsPage from './pages/linear/LinearTransitionsPage'
import RadialTransitionsPage from './pages/radial/RadialTransitionsPage'
import LinearBarsPage from './pages/linear/LinearBarsPage'
import LinearAreaPage from './pages/linear/LinearAreaPage'
import LinearAxisPage from './pages/linear/LinearAxisPage'
import LinearBarGroupPage from './pages/linear/LinearBarGroupPage'
import LinearBarStackPage from './pages/linear/LinearBarStackPage'
import LinearLinePage from './pages/linear/LinearLinePage'
import LinearPointsPage from './pages/linear/LinearPointsPage'
import LinearTextPage from './pages/linear/LinearTextPage'

export const AppRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      <Route path="/linear/bars" Component={LinearBarsPage} />
      <Route path="/linear/area" Component={LinearAreaPage} />
      <Route path="/linear/axis" Component={LinearAxisPage} />
      <Route path="/linear/bargroup" Component={LinearBarGroupPage} />
      <Route path="/linear/barstack" Component={LinearBarStackPage} />
      <Route path="/linear/line" Component={LinearLinePage} />
      <Route path="/linear/points" Component={LinearPointsPage} />
      <Route path="/linear/text" Component={LinearTextPage} />

      <Route path="/linear/transitions" Component={LinearTransitionsPage} />

      <Route path="/plotted/elements" Component={PlottedElementsPage} />
      <Route path="/plotted/transitions" Component={PlottedTransitionsPage} />

      <Route path="/radial/elements" Component={RadialElementsPage} />
      <Route path="/radial/transitions" Component={RadialTransitionsPage} />
    </Routes>
  )
}
