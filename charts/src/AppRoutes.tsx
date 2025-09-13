import { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import PlottedTransitionsPage from './pages/plotted/PlottedTransitionsPage'
import OrthogonalTransitionsPage from './pages/orthogonal/OrthogonalTransitionsPage'
import RadialTransitionsPage from './pages/radialArc/RadialArcTransitionsPage'
import OrthogonalBarsPage from './pages/orthogonal/bars/OrthogonalBarsPage'
import CentroidLinePage from './pages/radialCentroid/line/RadialCentroidLinePage'
import CentroidPointsPage from './pages/radialCentroid/points/RadialCentroidPointsPage'
import CanvasPage from './pages/core/canvas/CanvasPage'
import OrthogonalAreaPage from './pages/orthogonal/area/OrthogonalAreaPage'
import OrthogonalAxisPage from './pages/orthogonal/axes/OrthogonalAxisPage'
import OrthogonalBarGroupPage from './pages/orthogonal/barGroup/OrthogonalBarGroupPage'
import OrthogonalBarStackPage from './pages/orthogonal/barStack/OrthogonalBarStackPage'
import OrthogonalLinePage from './pages/orthogonal/line/OrthogonalLinePage'
import OrthogonalPointsPage from './pages/orthogonal/points/OrthogonalPointsPage'
import OrthogonalTextPage from './pages/orthogonal/text/OrthogonalTextPage'
import PlottedLinePage from './pages/plotted/line/PlottedLinePage'
import PlottedPointsPage from './pages/plotted/points/PlottedPointsPage'
import PlottedTextPage from './pages/plotted/text/PlottedTextPage'
import RadialArcPage from './pages/radialArc/slice/SlicePage'
import RadialArcTextPage from './pages/radialArc/arcText/ArcTextPage'
import CentroidAreaPage from './pages/radialCentroid/area/RadialCentroidAreaPage'
import CentroidAxisPage from './pages/radialCentroid/axis/RadialCentroidAxisPage'
import CentroidSpokesPage from './pages/radialCentroid/spokes/RadialCentroidSpokesPage'
import UnboundLegendPage from './pages/unbound/legend/UnboundLegendPage'
import UnboundTextPage from './pages/unbound/text/UnboundTextPage'
import CentroidTextPage from './pages/radialCentroid/text/RadialCentroidTextPage'
import EnumPage from './pages/core/enums/EnumPage'
import ConfigPage from './pages/core/config/ConfigPage'
import GradientPage from './pages/core/gradient/GradientPage'
import ArcSegmentPage from './pages/radialArc/segment/ArcSegmentPage'
import ArcEnvelopePage from './pages/radialArc/envelope/ArcEnvelopePage'

export const Paths = {
  HOME: '/',
  CANVAS: '/canvas',
  ENUMS: '/enums',
  CONFIG: '/config',
  GRADIENT: '/gradient',
  UNBOUND: {
    LEGEND: '/unbound/legend',
    TEXT: '/unbound/text',
  },
  ORTHOGONAL: {
    BARS: '/orthogonal/bars',
    AREA: '/orthogonal/area',
    AXIS: '/orthogonal/axis',
    BARGROUP: '/orthogonal/bargroup',
    BARSTACK: '/orthogonal/barstack',
    LINE: '/orthogonal/line',
    POINTS: '/orthogonal/points',
    TEXT: '/orthogonal/text',
    TRANSITIONS: '/orthogonal/transitions',
  },
  PLOTTED: {
    POINTS: '/plotted/points',
    LINE: '/plotted/line',
    TEXT: '/plotted/text',
    TRANSITIONS: '/plotted/transitions',
  },
  RADIAL_ARC: {
    ARC: '/radialarc/arc',
    PETAL: '/radialarc/envelope',
    SEGMENT: '/radialarc/segment',
    TEXT: '/radialarc/text',
  },
  RADIAL_CENTROID: {
    AREA: '/radialcentroid/area',
    AXIS: '/radialcentroid/axis',
    LINE: '/radialcentroid/line',
    POINTS: '/radialcentroid/points',
    SPOKES: '/radialcentroid/spokes',
    TEXT: '/radialcentroid/text',
  },
  RADIAL: {
    TRANSITIONS: '/radial/transitions',
  },
}

export const AppRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path={Paths.HOME} element={<HomePage />} />

      <Route path={Paths.CANVAS} element={<CanvasPage />} />
      <Route path={Paths.ENUMS} element={<EnumPage />} />
      <Route path={Paths.CONFIG} element={<ConfigPage />} />
      <Route path={Paths.GRADIENT} element={<GradientPage />} />

      <Route path={Paths.ORTHOGONAL.BARS} element={<OrthogonalBarsPage />} />
      <Route path={Paths.ORTHOGONAL.AREA} element={<OrthogonalAreaPage />} />
      <Route path={Paths.ORTHOGONAL.AXIS} element={<OrthogonalAxisPage />} />
      <Route
        path={Paths.ORTHOGONAL.BARGROUP}
        element={<OrthogonalBarGroupPage />}
      />
      <Route
        path={Paths.ORTHOGONAL.BARSTACK}
        element={<OrthogonalBarStackPage />}
      />
      <Route path={Paths.ORTHOGONAL.LINE} element={<OrthogonalLinePage />} />
      <Route
        path={Paths.ORTHOGONAL.POINTS}
        element={<OrthogonalPointsPage />}
      />
      <Route path={Paths.ORTHOGONAL.TEXT} element={<OrthogonalTextPage />} />

      <Route path={Paths.PLOTTED.POINTS} element={<PlottedPointsPage />} />
      <Route path={Paths.PLOTTED.LINE} element={<PlottedLinePage />} />
      <Route path={Paths.PLOTTED.TEXT} element={<PlottedTextPage />} />

      <Route path={Paths.RADIAL_ARC.ARC} element={<RadialArcPage />} />
      <Route path={Paths.RADIAL_ARC.PETAL} element={<ArcEnvelopePage />} />
      <Route path={Paths.RADIAL_ARC.SEGMENT} element={<ArcSegmentPage />} />
      <Route path={Paths.RADIAL_ARC.TEXT} element={<RadialArcTextPage />} />
      <Route path={Paths.RADIAL_CENTROID.AREA} element={<CentroidAreaPage />} />
      <Route path={Paths.RADIAL_CENTROID.AXIS} element={<CentroidAxisPage />} />
      <Route path={Paths.RADIAL_CENTROID.LINE} element={<CentroidLinePage />} />
      <Route
        path={Paths.RADIAL_CENTROID.POINTS}
        element={<CentroidPointsPage />}
      />
      <Route
        path={Paths.RADIAL_CENTROID.SPOKES}
        element={<CentroidSpokesPage />}
      />
      <Route path={Paths.RADIAL_CENTROID.TEXT} element={<CentroidTextPage />} />

      <Route path={Paths.UNBOUND.LEGEND} element={<UnboundLegendPage />} />
      <Route path={Paths.UNBOUND.TEXT} element={<UnboundTextPage />} />

      <Route
        path={Paths.RADIAL.TRANSITIONS}
        element={<RadialTransitionsPage />}
      />
      <Route
        path={Paths.PLOTTED.TRANSITIONS}
        element={<PlottedTransitionsPage />}
      />
      <Route
        path={Paths.ORTHOGONAL.TRANSITIONS}
        element={<OrthogonalTransitionsPage />}
      />
    </Routes>
  )
}
