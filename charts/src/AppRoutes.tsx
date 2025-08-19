import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import PlottedTransitionsPage from './pages/plotted/PlottedTransitionsPage'
import orthogonalTransitionsPage from './pages/orthogonal/OrthogonalTransitionsPage'
import RadialTransitionsPage from './pages/radialArc/RadialArcTransitionsPage'
import orthogonalBarsPage from './pages/orthogonal/bars/OrthogonalBarsPage'
import RadialCentroidLinePage from './pages/radialCentroid/line/RadialCentroidLinePage'
import RadialCentroidPointsPage from './pages/radialCentroid/points/RadialCentroidPointsPage'
import CanvasPage from './pages/core/canvas/CanvasPage'
import orthogonalAreaPage from './pages/orthogonal/area/OrthogonalAreaPage'
import orthogonalAxisPage from './pages/orthogonal/axes/OrthogonalAxisPage'
import orthogonalBarGroupPage from './pages/orthogonal/barGroup/OrthogonalBarGroupPage'
import orthogonalBarStackPage from './pages/orthogonal/barStack/OrthogonalBarStackPage'
import orthogonalLinePage from './pages/orthogonal/line/OrthogonalLinePage'
import orthogonalPointsPage from './pages/orthogonal/points/OrthogonalPointsPage'
import orthogonalTextPage from './pages/orthogonal/text/OrthogonalTextPage'
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
import RadialCentroidTextPage from './pages/radialCentroid/text/RadialCentroidTextPage'
import EnumPage from './pages/core/enums/EnumPage'
import ConfigPage from './pages/core/config/ConfigPage'
import GradientPage from './pages/core/gradient/GradientPage'

export const AppRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      <Route path="/canvas" Component={CanvasPage} />
      <Route path="/enums" Component={EnumPage} />
      <Route path="/config" Component={ConfigPage} />
      <Route path="/gradient" Component={GradientPage} />

      <Route path="/unbound/legend" Component={UnboundLegendPage} />
      <Route path="/unbound/text" Component={UnboundTextPage} />

      <Route path="/orthogonal/bars" Component={orthogonalBarsPage} />
      <Route path="/orthogonal/area" Component={orthogonalAreaPage} />
      <Route path="/orthogonal/axis" Component={orthogonalAxisPage} />
      <Route path="/orthogonal/bargroup" Component={orthogonalBarGroupPage} />
      <Route path="/orthogonal/barstack" Component={orthogonalBarStackPage} />
      <Route path="/orthogonal/line" Component={orthogonalLinePage} />
      <Route path="/orthogonal/points" Component={orthogonalPointsPage} />
      <Route path="/orthogonal/text" Component={orthogonalTextPage} />

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
      <Route path="/radialcentroid/text" Component={RadialCentroidTextPage} />

      <Route path="/plotted/transitions" Component={PlottedTransitionsPage} />
      <Route
        path="/orthogonal/transitions"
        Component={orthogonalTransitionsPage}
      />
      <Route path="/radial/transitions" Component={RadialTransitionsPage} />
    </Routes>
  )
}
