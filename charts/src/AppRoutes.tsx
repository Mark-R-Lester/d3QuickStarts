import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LinearElementsPage from './pages/linear/LinearElementsPage'
import LinearChartsPage from './pages/linear/LinearChartsPage'
import PlottedElementsPage from './pages/plotted/PlottedElementsPage'
import PlottedChartsPage from './pages/plotted/PlottedChartsPage'
import RadialElementsPage from './pages/radial/RadialElementsPage'
import RadialChartsPage from './pages/radial/RadialChartsPage'
import PlottedTransitionsPage from './pages/plotted/PlottedTransitionsPage'
import LinearTransitionsPage from './pages/linear/LinearTransitionsPage'
import RadialTransitionsPage from './pages/radial/RadialTransitionsPage'

export const AppRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      <Route path="/linear/elements" Component={LinearElementsPage} />
      <Route path="/linear/charts" Component={LinearChartsPage} />
      <Route path="/linear/transitions" Component={LinearTransitionsPage} />

      <Route path="/plotted/elements" Component={PlottedElementsPage} />
      <Route path="/plotted/charts" Component={PlottedChartsPage} />
      <Route path="/plotted/transitions" Component={PlottedTransitionsPage} />

      <Route path="/radial/elements" Component={RadialElementsPage} />
      <Route path="/radial/charts" Component={RadialChartsPage} />
      <Route path="/radial/transitions" Component={RadialTransitionsPage} />
    </Routes>
  )
}
