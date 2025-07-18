import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import PlottedTransitionsPage from './pages/plotted/PlottedTransitionsPage'
import LinearTransitionsPage from './pages/linear/LinearTransitionsPage'
import RadialTransitionsPage from './pages/radialArc/RadialArcTransitionsPage'
import LinearBarsPage from './pages/linear/bars/LinearBarsPage'
import RadialCentroidLinePage from './pages/radialCentroid/line/RadialCentroidLinePage'
import RadialCentroidPointsPage from './pages/radialCentroid/points/RadialCentroidPointsPage'
import CanvasPage from './pages/canvas/CanvasPage'
import LinearAreaPage from './pages/linear/area/LinearAreaPage'
import LinearAxisPage from './pages/linear/axes/LinearAxisPage'
import LinearBarGroupPage from './pages/linear/barGroup/LinearBarGroupPage'
import LinearBarStackPage from './pages/linear/barStack/LinearBarStackPage'
import LinearLinePage from './pages/linear/line/LinearLinePage'
import LinearPointsPage from './pages/linear/points/LinearPointsPage'
import LinearTextPage from './pages/linear/text/LinearTextPage'
import PlottedLinePage from './pages/plotted/line/PlottedLinePage'
import PlottedPointsPage from './pages/plotted/points/PlottedPointsPage'
import PlottedTextPage from './pages/plotted/text/PlottedTextPage'
import RadialArcPage from './pages/radialArc/arc/RadialArcPage'
import RadialArcTextPage from './pages/radialArc/arcText/RadialArcTextPage'
import RadialCentroidAreaPage from './pages/radialCentroid/area/RadialCentroidAreaPage'
import RadialCentroidAxisPage from './pages/radialCentroid/axis/RadialCentroidAxisPage'
import RadialCentroidSpokesPage from './pages/radialCentroid/spokes/RadialCentroidSpokesPage'
import UnboundLegendPage from './pages/unbound/legend/UnboundLegendPage'
import UnboundTextPage from './pages/unbound/text/UnboundTextPage'

export const AppRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      <Route path="/canvas" Component={CanvasPage} />

      <Route path="/unbound/legend" Component={UnboundLegendPage} />
      <Route path="/unbound/text" Component={UnboundTextPage} />

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
