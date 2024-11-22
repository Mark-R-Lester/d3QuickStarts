import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LinearElementsPage from './pages/linear/LinearElementsPage'
import LinearChartsPage from './pages/linear/LinearChartsPage'
import PlottedElementsPage from './pages/plotted/PlottedElementsPage'
import PlottedChartsPage from './pages/plotted/PlottedChartsPage'
import RadialElementsPage from './pages/radial/RadialElementsPage'
import RadialChartsPage from './pages/radial/RadialChartsPage'

export const AppRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      <Route path="/linear/elements" Component={LinearElementsPage} />
      <Route path="/linear/charts" Component={LinearChartsPage} />

      <Route path="/plotted/elements" Component={PlottedElementsPage} />
      <Route path="/plotted/charts" Component={PlottedChartsPage} />

      <Route path="/radial/elements" Component={RadialElementsPage} />
      <Route path="/radial/charts" Component={RadialChartsPage} />
    </Routes>
  )
}
