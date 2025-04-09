import { RootLayoutData } from './ApplicationRootLayout'
import { drawerLayoutDataLinear } from './drawerMenuDataLinear'
import { drawerLayoutDataPlotted } from './drawerMenuDataPlotted'
import { drawerLayoutDataRadialArc } from './drawerMenuDataRadialArc'
import { drawerLayoutDataRadialCentroid } from './drawerMenuDataRadialCentroid'

export const rootLayoutData: RootLayoutData = {
  menuData: [
    {
      appBarTitle: 'home',
      linkAlternatives: {
        route: '/',
        menuButtonProps: [],
      },
    },
    {
      appBarTitle: 'linear',
      linkAlternatives: {
        menuButtonProps: drawerLayoutDataLinear,
      },
    },
    {
      appBarTitle: 'plotted',
      linkAlternatives: {
        menuButtonProps: drawerLayoutDataPlotted,
      },
    },
    {
      appBarTitle: 'radial Arc',
      linkAlternatives: {
        menuButtonProps: drawerLayoutDataRadialArc,
      },
    },
    {
      appBarTitle: 'radial Centroid',
      linkAlternatives: {
        menuButtonProps: drawerLayoutDataRadialCentroid,
      },
    },
  ],
}
