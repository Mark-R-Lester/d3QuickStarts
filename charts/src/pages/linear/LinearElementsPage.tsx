import { Typography } from '@mui/material'
import { LinearAreaElement } from '../../components/atoms/chart/linear/elements/LinearAreaElement'
import { LinearBarsVerticalElement } from '../../components/atoms/chart/linear/elements/LinearBarsVerticalElement'
import { LinearBarsHorizontalElement } from '../../components/atoms/chart/linear/elements/LinearBarsHorizontalElement'
import { LinearFloatingBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsFloatingElement'
import { LinearLineHorizontalElement } from '../../components/atoms/chart/linear/elements/LinearLineHorizontalElement'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearLineVerticalElement } from '../../components/atoms/chart/linear/elements/LinearLineVerticalElement'
import { LinearAxisElement } from '../../components/atoms/chart/linear/elements/LinearAxisElement'
import { LinearPointsVerticalElement } from '../../components/atoms/chart/linear/elements/LinearPointsVerticalElement'
import { LinearPointsHorizontalElement } from '../../components/atoms/chart/linear/elements/LinearPointsHorizontalElement'
import { LinearTextElement } from '../../components/atoms/chart/linear/elements/LinearTextElement'

export default function LinearChartsPage() {
  const elements: JSX.Element[] = [
    <LinearAreaElement targetId="linearArea" />,
    <LinearBarsVerticalElement targetId="linearVerticalBars" />,
    <LinearBarsHorizontalElement targetId="linearHorizontalBars" />,
    <LinearFloatingBarsElement targetId="linearBarsFloating" />,
    <LinearLineHorizontalElement targetId="linearLineHorizontal" />,
    <LinearLineVerticalElement targetId="linearLineVertical" />,
    <LinearAxisElement targetId="linearAxis" />,
    <LinearPointsHorizontalElement targetId="linearPointsHorizontal" />,
    <LinearPointsVerticalElement targetId="linearPointsVertical" />,
    <LinearTextElement targetId="linearText" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Elements
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
