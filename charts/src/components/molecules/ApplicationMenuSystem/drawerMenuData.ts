import { DropdownMenuProps } from '../../atoms/DropdownMenu'

export const menuCanvas: DropdownMenuProps = {
  title: 'Canvas',
  routes: [{ title: 'Canvas', route: '/canvas' }],
}

export const menuElementsPlotted: DropdownMenuProps = {
  title: 'Plotted',
  routes: [
    { title: 'Line', route: '/plotted/line' },
    { title: 'Points', route: '/plotted/points' },
    { title: 'Text', route: '/plotted/text' },
    { title: 'Legend', route: '/plotted/legend' },
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
  ],
}

export const menuElementsLinear: DropdownMenuProps = {
  title: 'Linear',
  routes: [
    { title: 'Bars', route: '/linear/bars' },
    { title: 'Area', route: '/linear/area' },
    { title: 'Axis', route: '/linear/axis' },
    { title: 'Bar Group', route: '/linear/bargroup' },
    { title: 'Bar Stack', route: '/linear/barstack' },
    { title: 'Line', route: '/linear/line' },
    { title: 'Points', route: '/linear/points' },
    { title: 'Text', route: '/linear/text' },
  ],
}
