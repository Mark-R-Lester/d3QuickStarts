import { Typography } from '@mui/material'
import { LinearAreaElement } from '../../components/atoms/chart/linear/elements/LinearAreaElement'
import { LinearBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsElement'
import { LinearFloatingBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsFloatingElement'
import { ElementGrid } from '../../components/atoms/ElementGrid'

export default function LinearChartsPage() {
  const elements: JSX.Element[] = [
    <LinearAreaElement targetId="linearArea" />,
    <LinearBarsElement targetId="linearBars" />,
    <LinearFloatingBarsElement targetId="linearBarsFloating" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Elements
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
