import { DropdownMenuProps } from '../../atoms/DropdownMenu'

export const drawerLayoutDataPlotted: DropdownMenuProps[] = [
  {
    title: 'Elements',
    routes: [
      { title: 'Line', route: '/plotted/line' },
      { title: 'Points', route: '/plotted/points' },
      { title: 'Text', route: '/plotted/text' },
      { title: 'Legend', route: '/plotted/legend' },
    ],
  },
]
