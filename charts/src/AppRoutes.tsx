import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import PlottedTransitionsPage from './pages/plotted/PlottedTransitionsPage'
import LinearTransitionsPage from './pages/linear/LinearTransitionsPage'
import RadialTransitionsPage from './pages/radialArc/RadialArcTransitionsPage'
import LinearBarsPage from './pages/linear/bars/LinearBarsPage'
import LinearAreaPage from './pages/linear/LinearAreaPage'
import LinearAxisPage from './pages/linear/LinearAxisPage'
import LinearBarGroupPage from './pages/linear/LinearBarGroupPage'
import LinearBarStackPage from './pages/linear/LinearBarStackPage'
import LinearLinePage from './pages/linear/LinearLinePage'
import LinearPointsPage from './pages/linear/LinearPointsPage'
import LinearTextPage from './pages/linear/LinearTextPage'
import PlottedLegendPage from './pages/plotted/PlottedLegendPage'
import PlottedLinePage from './pages/plotted/PlottedLinePage'
import PlottedPointsPage from './pages/plotted/PlottedPointsPage'
import PlottedTextPage from './pages/plotted/PlottedTextPage'
import RadialArcPage from './pages/radialArc/RadialArcPage'
import RadialArcTextPage from './pages/radialArc/RadialArcTextPage'
import RadialCentroidAreaPage from './pages/radialCentroid/RadialCentroidAreaPage'
import RadialCentroidAxisPage from './pages/radialCentroid/RadialCentroidAxisPage'
import RadialCentroidLinePage from './pages/radialCentroid/RadialCentroidLinePage'
import RadialCentroidPointsPage from './pages/radialCentroid/RadialCentroidPointsPage'
import RadialCentroidSpokesPage from './pages/radialCentroid/RadialCentroidSpokesPage'
import CanvasPage from './pages/canvas/CanvasPage'

export const AppRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      <Route path="/canvas" Component={CanvasPage} />

      <Route path="/linear/bars" Component={LinearBarsPage} />
      <Route path="/linear/area" Component={LinearAreaPage} />
      <Route path="/linear/axis" Component={LinearAxisPage} />
      <Route path="/linear/bargroup" Component={LinearBarGroupPage} />
      <Route path="/linear/barstack" Component={LinearBarStackPage} />
      <Route path="/linear/line" Component={LinearLinePage} />
      <Route path="/linear/points" Component={LinearPointsPage} />
      <Route path="/linear/text" Component={LinearTextPage} />

      <Route path="/plotted/points" Component={PlottedPointsPage} />
      <Route path="/plotted/line" Component={PlottedLinePage} />
      <Route path="/plotted/text" Component={PlottedTextPage} />
      <Route path="/plotted/legend" Component={PlottedLegendPage} />

      <Route path="/radialarc/arc" Component={RadialArcPage} />
      <Route path="/radialarc/text" Component={RadialArcTextPage} />

      <Route path="/radialcentroid/area" Component={RadialCentroidAreaPage} />
      <Route path="/radialcentroid/axis" Component={RadialCentroidAxisPage} />
      <Route path="/radialcentroid/line" Component={RadialCentroidLinePage} />
      <Route
        path="/radialcentroid/points"
        Component={RadialCentroidPointsPage}
      />
      <Route
        path="/radialCentroid/spokes"
        Component={RadialCentroidSpokesPage}
      />

      <Route path="/plotted/transitions" Component={PlottedTransitionsPage} />
      <Route path="/linear/transitions" Component={LinearTransitionsPage} />
      <Route path="/radial/transitions" Component={RadialTransitionsPage} />
    </Routes>
  )
}
