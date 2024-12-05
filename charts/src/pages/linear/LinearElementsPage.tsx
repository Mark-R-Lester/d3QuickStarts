import { Typography } from '@mui/material'
import { LinearAreaElement } from '../../components/atoms/chart/linear/elements/LinearAreaElement'
import { LinearBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsElement'
import { LinearFloatingBarsElement } from '../../components/atoms/chart/linear/elements/LinearBarsFloatingElement'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearLineElement } from '../../components/atoms/chart/linear/elements/LinearLineElement'
import { LinearAxisElement } from '../../components/atoms/chart/linear/elements/LinearAxisElement'
import { LinearPointsElement } from '../../components/atoms/chart/linear/elements/LinearPointsElement'
import { LinearBarsGroupedElement } from '../../components/atoms/chart/linear/elements/LinearBarsGroupedElement'
import { Grouping, Orientation } from '../../common/enums'

export default function LinearElementsPage() {
  const elements: JSX.Element[] = [
    <LinearBarsElement
      targetId="linearHorizontalBars"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearFloatingBarsElement
      targetId="linearHorizontalBarsFloating"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearLineElement
      targetId="linearLineHorizontal"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearPointsElement
      targetId="linearPointsHorizontal"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearBarsElement
      targetId="linearVerticalBars"
      orientation={Orientation.VERTICAL}
    />,
    <LinearFloatingBarsElement
      targetId="linearVerticalBarsFloating"
      orientation={Orientation.VERTICAL}
    />,

    <LinearLineElement
      targetId="linearLineVertical"
      orientation={Orientation.VERTICAL}
    />,

    <LinearPointsElement
      targetId="linearPointsVertical"
      orientation={Orientation.VERTICAL}
    />,
    <LinearBarsGroupedElement
      targetId="linearBarsGroupedVertical"
      grouping={Grouping.GROUPED}
    />,
    <LinearBarsGroupedElement
      targetId="linearBarsStackedVertical"
      grouping={Grouping.STACKED}
    />,
    <LinearAreaElement targetId="linearArea" />,
    <LinearAxisElement targetId="linearAxis" />,
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
