import { DropdownMenuProps } from '../../atoms/DropdownMenu'

export const menuCanvas: DropdownMenuProps = {
  title: 'Core',
  routes: [{ title: 'Canvas', route: '/canvas' }],
}

export const menuElementsUnbound: DropdownMenuProps = {
  title: 'Unbound',
  routes: [
    { title: 'Legend', route: '/unbound/legend' },
    { title: 'Text', route: '/unbound/text' },
  ],
}

export const menuElementsPlotted: DropdownMenuProps = {
  title: 'Plotted',
  routes: [
    { title: 'Line', route: '/plotted/line' },
    { title: 'Points', route: '/plotted/points' },
    { title: 'Text', route: '/plotted/text' },
  ],
}

export const menuElementsRadialArc: DropdownMenuProps = {
  title: 'Arc',
  routes: [
    { title: 'Arc', route: '/radialarc/arc' },
    { title: 'Text', route: '/radialarc/text' },
  ],
}

export const menuElementsRadialCentroid: DropdownMenuProps = {
  title: 'Centroid',
  routes: [
    { title: 'Area', route: '/radialcentroid/area' },
    { title: 'Axis', route: '/radialcentroid/axis' },
    { title: 'Points', route: '/radialcentroid/points' },
    { title: 'Line', route: '/radialcentroid/line' },
    { title: 'Spokes', route: '/radialcentroid/spokes' },
    { title: 'Text', route: '/radialcentroid/text' },
  ],
}

export const menuElementsOrthogonal: DropdownMenuProps = {
  title: 'Orthogonal',
  routes: [
    { title: 'Area', route: '/orthogonal/area' },
    { title: 'Axis', route: '/orthogonal/axis' },
    { title: 'Bars', route: '/orthogonal/bars' },
    { title: 'Bar Group', route: '/orthogonal/bargroup' },
    { title: 'Bar Stack', route: '/orthogonal/barstack' },
    { title: 'Line', route: '/orthogonal/line' },
    { title: 'Points', route: '/orthogonal/points' },
    { title: 'Text', route: '/orthogonal/text' },
  ],
}
